// src/features/workshops/components/WorkshopForm.tsx
import { useState, useEffect } from 'react';
import { Workshop, WorkshopFormData } from '@/types/workshop';

interface WorkshopFormProps {
  onSubmit: (data: WorkshopFormData) => void;
  onCancel: () => void;
  initialData?: Workshop | null;
}

export const WorkshopForm = ({ onSubmit, onCancel, initialData }: WorkshopFormProps) => {
  const [formData, setFormData] = useState<WorkshopFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    specialties: [],
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* Agregar campos similares para address, phone, email */}

      <div>
        <label className="block text-sm font-medium text-gray-700">Especialidades</label>
        <input
          type="text"
          value={formData.specialties.join(', ')}
          onChange={e => setFormData(prev => ({
            ...prev,
            specialties: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Separar por comas"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Actualizar' : 'Crear'} Taller
        </button>
      </div>
    </form>
  );
};