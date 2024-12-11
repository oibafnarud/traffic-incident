// src/features/insurance/InsuranceDashboard.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Actualizar esta importación
import { InboxIcon, ClockIcon, CheckCircleIcon } from "lucide-react";

export const InsuranceDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control - Aseguradora</h1>
        <p className="text-sm text-gray-600">Bienvenido, {user?.email}</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center space-x-2 py-4 px-6 border-b-2 font-medium`}
            >
              <InboxIcon className="h-4 w-4" />
              <span>Pendientes</span>
            </button>

            <button
              onClick={() => setActiveTab('inProcess')}
              className={`${
                activeTab === 'inProcess'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center space-x-2 py-4 px-6 border-b-2 font-medium`}
            >
              <ClockIcon className="h-4 w-4" />
              <span>En Proceso</span>
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center space-x-2 py-4 px-6 border-b-2 font-medium`}
            >
              <CheckCircleIcon className="h-4 w-4" />
              <span>Completados</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Casos Pendientes</h2>
              <p className="text-sm text-gray-600">No hay casos pendientes por revisar.</p>
            </div>
          )}
          
          {activeTab === 'inProcess' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Casos en Proceso</h2>
              <p className="text-sm text-gray-600">No hay casos en proceso actualmente.</p>
            </div>
          )}
          
          {activeTab === 'completed' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Casos Completados</h2>
              <p className="text-sm text-gray-600">No hay casos completados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;