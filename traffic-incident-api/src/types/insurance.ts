export interface InsuranceCompany extends BaseEntity {
    name: string;
    code: string;
    status: 'active' | 'inactive';
    agents: string[];
    address: string;
    phone: string;
    email: string;
    logo?: string;
   }
   
   export interface CoverageLetter extends BaseEntity {
    incidentId: string;
    clientId: string;
    vehicleId: string;
    insuranceCompanyId: string;
    policyNumber: string;
    requestDate: Date;
    status: 'pending' | 'approved' | 'rejected';
    coverageDetails: {
      limit: number;
      deductible: number;
      type: 'comprehensive' | 'liability' | 'collision';
      startDate: Date;
      endDate: Date;
    };
    documents: {
      digesettReport: string;
      driverLicense: string;
      vehicleRegistration: string;
      insuranceCard: string;
    };
    signature?: {
      signedBy: string;
      signedAt: Date;
      digitalSignature: string;
    };
   }