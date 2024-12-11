// types/insuranceLetter.ts
export interface CoverageLetter {
    id: string;
    incidentId: string;
    requestDate: Date;
    status: 'pending' | 'approved' | 'rejected';
    clientId: string;
    vehicleId: string;
    insuranceId: string;
    policyNumber: string;
    coverageDetails: {
      limit: number;
      deductible: number;
      type: string;
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