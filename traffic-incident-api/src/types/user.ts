export enum UserRole {
    CLIENT = 'client',
    INSURANCE_AGENT = 'insurance_agent',
    DIGESETT = 'digesett',
    ADMIN = 'admin'
   }
   
   export interface User extends BaseEntity {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    insuranceCompanyId?: string;
    digesettBadge?: string;
    status: 'active' | 'inactive';
    phone: string;
    cedula: string;
    documents?: UserDocument[];
   }
   
   export interface UserDocument {
    type: 'license' | 'cedula' | 'insurance_card';
    fileUrl: string;
    verified: boolean;
    expiresAt?: Date;
   }