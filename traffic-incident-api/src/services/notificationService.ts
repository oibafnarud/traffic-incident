// services/notificationService.ts
import Notification from '../models/Notification';
import { AppError } from '../types/error';

export class NotificationService {
 async createNotification(data: {
   userId: string;
   incidentId: string;
   type: string;
   message: string;
   details?: any;
 }) {
   const notification = new Notification(data);
   await notification.save();
   return notification;
 }

 async getNotifications(userId: string, query: any) {
   const { page = 1, limit = 20, unreadOnly = false } = query;
   
   const queryFilter = {
     userId,
     ...(unreadOnly ? { read: false } : {})
   };

   const [notifications, total] = await Promise.all([
     Notification.find(queryFilter)
       .sort({ createdAt: -1 })
       .skip((Number(page) - 1) * Number(limit))
       .limit(Number(limit))
       .populate('incidentId', 'status digesettReport.reportNumber'),
     Notification.countDocuments(queryFilter)
   ]);

   return {
     notifications,
     pagination: {
       total,
       pages: Math.ceil(total / Number(limit)),
       currentPage: Number(page)
     }
   };
 }

 async markAsRead(notificationId: string, userId: string) {
   const notification = await Notification.findOneAndUpdate(
     { _id: notificationId, userId },
     { read: true },
     { new: true }
   );

   if (!notification) {
     throw new AppError(404, 'Notificación no encontrada');
   }

   return notification;
 }

 async markAllAsRead(userId: string) {
   await Notification.updateMany(
     { userId, read: false },
     { read: true }
   );
 }

 async getUnreadCount(userId: string) {
   return Notification.countDocuments({ userId, read: false });
 }

 // Nuevos métodos para notificaciones específicas
 async notifyInsuranceCompany(letterId: string) {
   const letter = await InsuranceLetter.findById(letterId)
     .populate('insuranceCompanyId agents');
   
   const notification = await this.createNotification({
     userId: letter.insuranceCompanyId.agents,
     incidentId: letter.incidentId,
     type: 'COVERAGE_REQUEST',
     message: `Nueva solicitud de carta de cobertura #${letter.id}`,
     details: {
       letterId,
       clientName: letter.client.name,
       policyNumber: letter.policyNumber
     }
   });

   return notification;
 }

 async notifyDigesett(incidentId: string) {
   const digesettUsers = await User.find({ role: UserRole.DIGESETT });
   
   const notifications = await Promise.all(
     digesettUsers.map(user => 
       this.createNotification({
         userId: user.id,
         incidentId,
         type: 'NEW_INCIDENT',
         message: `Nuevo incidente reportado #${incidentId}`,
         details: { incidentId }
       })
     )
   );

   return notifications;
 }

 async notifyClient(userId: string, incidentId: string, type: string, message: string) {
   return this.createNotification({
     userId,
     incidentId,
     type,
     message,
     details: { incidentId }
   });
 }
}