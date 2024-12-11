interface InsuranceCompany {
    id: string;
    name: string;
    address: string;
    mainPhone: string;
    mainEmail: string;
    contacts: {
      claims: {
        name: string;
        phone: string;
        email: string;
      };
      coverage: {
        name: string;
        phone: string;
        email: string;
      };
    };
    documentation: {
      claims: string[];
      coverage: string[];
    };
    apiIntegration?: {
      enabled: boolean;
      apiUrl?: string;
      apiKey?: string;
      webhook?: string;
    };
    validationProcess: 'automatic' | 'manual';
    responseTime: {
      claims: string;
      coverage: string;
    };
  }