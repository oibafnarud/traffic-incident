export const authService = {
    async login(credentials: { email: string; password: string }) {
      const response = await api.post('/auth/login', credentials);
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    },
  
    async register(userData: any) {
      const response = await api.post('/auth/register', userData);
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    }
  };