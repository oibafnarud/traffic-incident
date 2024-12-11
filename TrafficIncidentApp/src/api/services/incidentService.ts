export const incidentService = {
    async create(data: any) {
      const formData = new FormData();
      
      // Agregar datos básicos
      formData.append('location', JSON.stringify(data.location));
      formData.append('vehicleId', data.vehicleId);
  
      // Agregar fotos
      data.photos.forEach((photo: string, index: number) => {
        formData.append('photos', {
          uri: photo,
          type: 'image/jpeg',
          name: `photo${index}.jpg`
        });
      });
  
      return api.post('/incidents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
  
    async getAll() {
      return api.get('/incidents');
    },
  
    async getById(id: string) {
      return api.get(`/incidents/${id}`);
    }
  };
  
  export default api;