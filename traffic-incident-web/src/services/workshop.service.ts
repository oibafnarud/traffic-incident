// src/services/workshop.service.ts
import { api } from '@/lib/axios';
import { Workshop } from '@/types/workshop';

export const workshopService = {
  async getWorkshops() {
    try {
      console.log('Obteniendo talleres...');
      const response = await api.get<{ data: Workshop[] }>('/workshops');
      console.log('Respuesta de talleres:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error en getWorkshops:', error);
      throw error;
    }
  },

  async updateWorkshop(id: string, data: Partial<Workshop>) {
    const response = await api.put(`/workshops/${id}`, data);
    return response.data.data;
  },

  async toggleStatus(id: string) {
    const response = await api.patch(`/workshops/${id}/toggle-status`);
    return response.data.data;
  }
};