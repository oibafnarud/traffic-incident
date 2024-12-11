// src/services/auth.service.ts
import { api } from '../lib/axios';

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    }
  }
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};