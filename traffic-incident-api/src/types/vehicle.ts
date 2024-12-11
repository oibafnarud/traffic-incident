export interface Vehicle extends BaseEntity {
    userId: string;
    brand: string;
    model: string;
    year: string;
    plate: string;
    chasis: string;
    color: string;
    insurance: {
      company: string;
      policyNumber: string;
      expiresAt: Date;
    };
   }