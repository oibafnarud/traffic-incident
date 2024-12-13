// src/lib/axios.ts
import axios from 'axios';
import { API_URL } from '@/config/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token en interceptor:', token); // Debug

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Headers:', config.headers); // Debug
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error response:', error.response); // Debug
    
    if (error.response?.status === 401) {
      // No redirigir si ya estamos en login
      if (!window.location.pathname.includes('/login')) {
        // Mantener la ruta actual para redireccionar después del login
        localStorage.setItem('lastPath', window.location.pathname);
        // Solo limpiar token, no redirigir (dejemos que el componente lo maneje)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

export { api };