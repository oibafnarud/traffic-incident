export interface DigitalSignature {
    documentId: string;
    officerId: string;
    signature: string;
    documentHash: string;
    timestamp: Date;
    status?: 'valid' | 'revoked';
  }
  
  export interface VerificationResult {
    isValid: boolean;
    details: {
      officerId: string;
      timestamp: Date;
      status: string;
    };
  }