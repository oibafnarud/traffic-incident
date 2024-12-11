// src/features/insurance/components/InsuranceForm.tsx
import { useState } from 'react';
import { Building2, Mail, Phone, Shield, MapPin } from 'lucide-react';

interface InsuranceFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const InsuranceForm = ({ onSubmit, onCancel, initialData }: InsuranceFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    mainPhone: initialData?.mainPhone || '',
    mainEmail: initialData?.mainEmail || '',
    contacts: {
      claims: {
        name: initialData?.contacts?.claims?.name || '',
        phone: initialData?.contacts?.claims?.phone || '',
        email: initialData?.contacts?.claims?.email || '',
      },
      coverage: {
        name: initialData?.contacts?.coverage?.name || '',
        phone: initialData?.contacts?.coverage?.phone || '',
        email: initialData?.contacts?.coverage?.email || '',
      }
    },
    validationProcess: initialData?.validationProcess || 'manual',
    apiEnabled: initialData?.apiEnabled || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Información General</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Aseguradora
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
                <Building2 className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
                <MapPin className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono Principal
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
                  <Phone className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="tel"
                  value={formData.mainPhone}
                  onChange={(e) => setFormData({...formData, mainPhone: e.target.value})}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Principal
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  value={formData.mainEmail}
                  onChange={(e) => setFormData({...formData, mainEmail: e.target.value})}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contactos para Reclamos */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Contactos para Reclamos</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Contacto</label>
            <input
              type="text"
              value={formData.contacts.claims.name}
              onChange={(e) => setFormData({
                ...formData,
                contacts: {
                  ...formData.contacts,
                  claims: {
                    ...formData.contacts.claims,
                    name: e.target.value
                  }
                }
              })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                value={formData.contacts.claims.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contacts: {
                    ...formData.contacts,
                    claims: {
                      ...formData.contacts.claims,
                      phone: e.target.value
                    }
                  }
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.contacts.claims.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contacts: {
                    ...formData.contacts,
                    claims: {
                      ...formData.contacts.claims,
                      email: e.target.value
                    }
                  }
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contactos para Cartas de Cobertura */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Contactos para Cartas de Cobertura</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Contacto</label>
            <input
              type="text"
              value={formData.contacts.coverage.name}
              onChange={(e) => setFormData({
                ...formData,
                contacts: {
                  ...formData.contacts,
                  coverage: {
                    ...formData.contacts.coverage,
                    name: e.target.value
                  }
                }
              })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                value={formData.contacts.coverage.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contacts: {
                    ...formData.contacts,
                    coverage: {
                      ...formData.contacts.coverage,
                      phone: e.target.value
                    }
                  }
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.contacts.coverage.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contacts: {
                    ...formData.contacts,
                    coverage: {
                      ...formData.contacts.coverage,
                      email: e.target.value
                    }
                  }
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Configuración</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Proceso de Validación
            </label>
            <select
              value={formData.validationProcess}
              onChange={(e) => setFormData({...formData, validationProcess: e.target.value})}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automático</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.apiEnabled}
              onChange={(e) => setFormData({...formData, apiEnabled: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Habilitar integración API
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {initialData ? 'Actualizar' : 'Crear'} Aseguradora
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};