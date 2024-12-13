// src/services/workshop.service.ts
import { api } from '@/lib/axios';
import { Workshop, WorkshopFormData } from '@/types/workshop';

export const workshopService = {
  async getWorkshops() {
    try {
      const response = await api.get<Workshop[]>('/workshops');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching workshops:', error);
      if (error.response?.status === 401) {
        // Token inválido o expirado
        throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
      }
      throw error;
    }
  },
  
  async createWorkshop(workshopData: WorkshopFormData) {
    const response = await api.post<Workshop>('/workshops', workshopData);
    return response.data;
  },

  async updateWorkshop(id: string, workshopData: WorkshopFormData) {
    const response = await api.put<Workshop>(`/workshops/${id}`, workshopData);
    return response.data;
  },

  async deleteWorkshop(id: string) {
    await api.delete(`/workshops/${id}`);
  },

  async toggleStatus(id: string) {
    const response = await api.patch<Workshop>(`/workshops/${id}/toggle-status`);
    return response.data;
  }
};