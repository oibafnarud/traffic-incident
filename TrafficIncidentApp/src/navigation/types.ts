export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
  };
  
  export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
  };
  
  export type MainStackParamList = {
    Home: undefined;
    NewIncident: undefined;
    IncidentDetails: { id: string };
    Profile: undefined;
  };