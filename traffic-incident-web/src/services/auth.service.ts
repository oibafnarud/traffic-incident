// src/services/auth.service.ts
import { api } from '@/lib/axios';

interface AuthResponse {
  data: {
    token: string;
    user: {
      email: string;
      role: string;
    };
  };
}

export const authService = {
  async login(email: string, password: string) {
    try {
      console.log('Credenciales enviadas:', { email, password });
      
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password
      });
      
      console.log('Respuesta del servidor:', response);
      return response;
    } catch (error: any) {
      console.error('Detalles del error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: JSON.parse(error.config?.data || '{}')
        }
      });
      throw error;
    }
  }
};