import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { NotificationService } from '../services/notificationService';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

const notificationService = new NotificationService();

export const notificationController = {
  getUserNotifications: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await notificationService.getNotifications(
      req.user.userId,
      req.query
    );

    res.json({
      status: 'success',
      data: result
    });
  }),

  markAsRead: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { notificationId } = req.params;
    const notification = await notificationService.markAsRead(
      notificationId,
      req.user.userId
    );

    res.json({
      status: 'success',
      data: notification
    });
  }),

  markAllAsRead: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await notificationService.markAllAsRead(req.user.userId);

    res.json({
      status: 'success',
      message: 'Todas las notificaciones marcadas como leídas'
    });
  }),

  getUnreadCount: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const count = await notificationService.getUnreadCount(req.user.userId);

    res.json({
      status: 'success',
      data: { count }
    });
  })
};