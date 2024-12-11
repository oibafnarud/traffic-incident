export interface Incident extends BaseEntity {
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    date: Date;
    status: 'pending' | 'processing' | 'completed';
    parties: IncidentParty[];
    digesettReport?: {
      reportNumber: string;
      officerId: string;
      signedAt?: Date;
      fileUrl?: string;
    };
   }
   
   export interface IncidentParty {
    userId: string;
    vehicleId: string;
    isResponsible?: boolean;
    statement?: string;
    documents: {
      type: string;
      fileUrl: string;
      verified: boolean;
    }[];
   }