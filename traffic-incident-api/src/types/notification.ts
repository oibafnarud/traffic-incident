export interface Notification extends BaseEntity {
    userId: string;
    incidentId: string;
    type: string;
    message: string;
    read: boolean;
    details?: any;
   }