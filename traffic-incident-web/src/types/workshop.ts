// src/types/workshop.ts
export interface Workshop {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    specialties: string[];
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface WorkshopFormData {
    name: string;
    address: string;
    phone: string;
    email: string;
    specialties: string[];
    status: 'active' | 'inactive';
  }