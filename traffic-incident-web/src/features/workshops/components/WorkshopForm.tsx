// src/features/workshops/components/WorkshopForm.tsx
import { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface WorkshopFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const WorkshopForm = ({ onSubmit, onCancel, initialData }: WorkshopFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    specialties: initialData?.specialties?.join(', ') || '',
    status: initialData?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const specialties = formData.specialties
      .split(',')
      .map(s => s.trim())
      .filter(s => s);

    onSubmit({
      ...formData,
      specialties
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">
        {initialData ? 'Editar Taller' : 'Nuevo Taller'}
      </h2>

      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <Input
        label="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Especialidades (separadas por coma)"
        name="specialties"
        value={formData.specialties}
        onChange={handleChange}
        required
      />

      <div className="flex items-center space-x-2">
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};