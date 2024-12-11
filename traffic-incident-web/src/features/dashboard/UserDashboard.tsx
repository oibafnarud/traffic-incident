import { useState } from 'react';
import { AlertCircle, Car, FileText, Shield, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Botón de Emergencia */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <Link to="/user/report-incident" className="block">
          <button className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-lg hover:bg-red-700">
            <AlertCircle size={24} />
            <span className="text-lg font-semibold">Reportar Incidente</span>
          </button>
        </Link>
        <p className="text-center text-sm text-red-600 mt-2">
          Solo para accidentes de tránsito
        </p>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: Car, label: 'Mis Vehículos', route: '/vehicles' },
          { icon: FileText, label: 'Mis Documentos', route: '/documents' },
          { icon: Shield, label: 'Seguros', route: '/insurance' },
        ].map((action, i) => (
          <button key={i} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50">
            <action.icon size={24} className="text-blue-600" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Estado y Notificaciones */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Estado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">Documentos Pendientes</p>
            <p className="text-yellow-600">Licencia por vencer en 30 días</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">Vehículos Activos</p>
            <p className="text-green-600">2 vehículos con seguro vigente</p>
          </div>
        </div>
      </div>

      {/* Contactos de Emergencia */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Contactos de Emergencia</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="tel:911" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="text-blue-600" />
            <div>
              <p className="font-medium">Sistema 9-1-1</p>
              <p className="text-sm text-gray-500">Emergencias</p>
            </div>
          </a>
          <a href="tel:*462" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="text-blue-600" />
            <div>
              <p className="font-medium">DIGESETT</p>
              <p className="text-sm text-gray-500">*462</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};