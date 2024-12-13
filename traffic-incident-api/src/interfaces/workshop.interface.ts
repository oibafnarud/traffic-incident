export interface IWorkshop {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    specialties: string[];
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
  }