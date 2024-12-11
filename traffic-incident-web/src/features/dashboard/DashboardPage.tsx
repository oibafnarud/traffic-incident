import { StatCard } from './components/StatCard';
import { RecentIncidents } from './components/RecentIncidents';
import { IncidentsChart } from './components/IncidentsChart';
import { NotificationsPanel } from './components/NotificationsPanel';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Nuevo Incidente
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Incidentes Activos"
          value="24"
          icon="alert"
          change="+2"
          trend="up"
        />
        <StatCard 
          title="Incidentes Resueltos"
          value="156"
          icon="check"
          change="+12"
          trend="up"
        />
        <StatCard 
          title="Vehículos Registrados"
          value="203"
          icon="car"
          change="+5"
          trend="up"
        />
        <StatCard 
          title="Tiempo Promedio"
          value="2.5h"
          icon="clock"
          change="-30m"
          trend="down"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Incidentes por Estado</h2>
          <IncidentsChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Notificaciones</h2>
          <NotificationsPanel />
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Incidentes Recientes</h2>
        </div>
        <RecentIncidents />
      </div>
    </div>
  );
};

// src/features/dashboard/components/StatCard.tsx
interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  change: string;
  trend: 'up' | 'down';
}

export const StatCard = ({ title, value, icon, change, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Icon placeholder */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            icon === 'alert' ? 'bg-red-100 text-red-600' :
            icon === 'check' ? 'bg-green-100 text-green-600' :
            icon === 'car' ? 'bg-blue-100 text-blue-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            {/* Add icon here */}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className={`ml-2 text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};