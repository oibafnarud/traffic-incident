// src/services/workshop.service.ts
import { api } from '../lib/axios';

export interface Workshop {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

  export const workshopService = {
    async getAll() {
      try {
        const response = await api.get('/workshops');
        console.log('Respuesta workshops:', response); // Debug
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener workshops:', error);
        throw error;
      }
    },

  // Crear un nuevo taller
  async create(data: Omit<Workshop, 'id'>) {
    const response = await api.post<{ data: Workshop }>('/workshops', data);
    return response.data.data;
  },

  // Actualizar un taller
  async update(id: string, data: Partial<Workshop>) {
    const response = await api.put<{ data: Workshop }>(`/workshops/${id}`, data);
    return response.data.data;
  },

  // Obtener un taller específico
  async getById(id: string) {
    const response = await api.get<{ data: Workshop }>(`/workshops/${id}`);
    return response.data.data;
  },

  // Cambiar estado del taller
  async toggleStatus(id: string) {
    const response = await api.patch<{ data: Workshop }>(`/workshops/${id}/toggle-status`);
    return response.data.data;
  }
};