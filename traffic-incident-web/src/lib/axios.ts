// src/lib/axios.ts
import axios from 'axios';
import { API_URL } from '@/config/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token en interceptor:', token); // Debug
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error interceptado:', error.response?.status); // Debug
    
    // Solo manejamos el 401 si no estamos ya en la página de login
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      // Guardamos la ruta actual para redireccionar después del login
      localStorage.setItem('lastPath', window.location.pathname);
      // Limpiamos datos de autenticación
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export { api };