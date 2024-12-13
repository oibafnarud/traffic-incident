// src/features/workshops/WorkshopsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { workshopService } from '@/services/workshop.service';

export const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        // Verificar que estemos autenticados
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No hay token disponible');
          navigate('/login');
          return;
        }

        console.log('Iniciando fetch de talleres con token:', token);
        setLoading(true);
        const data = await workshopService.getWorkshops();
        console.log('Datos de talleres recibidos:', data);
        setWorkshops(data);
      } catch (error: any) {
        console.error('Error al obtener talleres:', error);
        // Si es error de autenticación, manejarlo específicamente
        if (error.response?.status === 401 || error.message.includes('autenticación')) {
          console.log('Error de autenticación detectado');
          navigate('/login', { state: { from: '/workshops' } });
        } else {
          setError(error.message || 'Error al cargar los talleres');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [navigate]);

  const handleSubmit = async (data: any) => {
    try {
      if (editingWorkshop) {
        await workshopService.updateWorkshop(editingWorkshop.id, data);
      } else {
        await workshopService.createWorkshop(data);
      }
      // Recargar la lista de talleres
      const updatedWorkshops = await workshopService.getWorkshops();
      setWorkshops(updatedWorkshops);
      setIsModalOpen(false);
      setEditingWorkshop(null);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Error al procesar el taller');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Talleres Asociados</h1>
        <button 
          onClick={() => {
            setEditingWorkshop(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Taller
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{workshop.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    workshop.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {workshop.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {workshop.address}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {workshop.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {workshop.email}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Especialidades:</p>
              <div className="flex flex-wrap gap-2">
                {workshop.specialties.map(specialty => (
                  <span key={specialty} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => {
                  setEditingWorkshop(workshop);
                  setIsModalOpen(true);
                }}
                className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded"
              >
                Editar
              </button>
              <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingWorkshop(null);
        }}
      >
        <WorkshopForm 
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingWorkshop(null);
          }}
          initialData={editingWorkshop}
        />
      </Modal>
    </div>
  );
};