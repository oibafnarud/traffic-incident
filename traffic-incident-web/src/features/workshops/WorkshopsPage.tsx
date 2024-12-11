// src/features/workshops/WorkshopsPage.tsx
import { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, Plus } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { WorkshopForm } from './components/WorkshopForm';
import { workshopService } from '../../services/workshop.service';
import { toast } from 'sonner';

export const WorkshopsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkshops = async () => {
    try {
      setIsLoading(true);
      const data = await workshopService.getAll();
      setWorkshops(data);
    } catch (error) {
      toast.error('Error al cargar los talleres');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingWorkshop) {
        await workshopService.update(editingWorkshop.id, data);
        toast.success('Taller actualizado exitosamente');
      } else {
        await workshopService.create(data);
        toast.success('Taller creado exitosamente');
      }
      setIsModalOpen(false);
      setEditingWorkshop(null);
      loadWorkshops();
    } catch (error) {
      toast.error('Error al guardar el taller');
    }
  };

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
          <Plus size={20} />
          Nuevo Taller
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center py-8">Cargando talleres...</div>
        ) : workshops.length === 0 ? (
          <div className="col-span-2 text-center py-8">No hay talleres registrados</div>
        ) : (
          workshops.map(workshop => (
            <div key={workshop.id} className="bg-white rounded-xl shadow-sm p-6">
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
                  <MapPin size={16} />
                  {workshop.address}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  {workshop.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
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
                <button 
                  onClick={() => handleToggleStatus(workshop)}
                  className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded"
                >
                  {workshop.status === 'active' ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))
        )}
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