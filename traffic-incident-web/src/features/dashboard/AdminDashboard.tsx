// src/features/dashboard/AdminDashboard.tsx
import { 
    Users, Building2, Car, FileText, 
    AlertCircle, CheckCircle2, Wrench, Shield
   } from 'lucide-react';
   
   export const AdminDashboard = () => {
    return (
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
          <div className="flex gap-3">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
              <Users size={20} />
              Nuevo Usuario
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Building2 size={20} />
              Nuevo Taller
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Shield size={20} />
              Nueva Aseguradora
            </button>
          </div>
        </div>
   
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Incidentes Totales */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Incidentes Totales</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">1,234</p>
                  <span className="ml-2 text-sm font-medium text-green-600">+15%</span>
                </div>
              </div>
            </div>
          </div>
   
          {/* Talleres Asociados */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Talleres Asociados</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">48</p>
                  <span className="ml-2 text-sm font-medium text-green-600">+3</span>
                </div>
              </div>
            </div>
          </div>
   
          {/* Aseguradoras */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Aseguradoras</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                  <span className="ml-2 text-sm font-medium text-green-600">Activas</span>
                </div>
              </div>
            </div>
          </div>
   
          {/* Cartas de Cobertura */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Cartas Pendientes</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">25</p>
                  <span className="ml-2 text-sm font-medium text-yellow-600">Por firmar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
   
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Talleres Registrados */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Talleres Registrados</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">Ver todos</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Taller Mecánico Express', status: 'active', location: 'Santo Domingo' },
                  { id: 2, name: 'AutoService Plus', status: 'active', location: 'Santiago' },
                  { id: 3, name: 'Talleres Unidos', status: 'inactive', location: 'La Romana' },
                ].map((taller) => (
                  <div key={taller.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{taller.name}</p>
                      <p className="text-sm text-gray-500">{taller.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      taller.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {taller.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
   
          {/* Aseguradoras */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Aseguradoras</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">Ver todas</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Seguros Universal', cases: 156, status: 'active' },
                  { id: 2, name: 'Mapfre BHD', cases: 142, status: 'active' },
                  { id: 3, name: 'La Colonial', cases: 98, status: 'active' },
                ].map((aseguradora) => (
                  <div key={aseguradora.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{aseguradora.name}</p>
                      <p className="text-sm text-gray-500">{aseguradora.cases} casos atendidos</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Ver detalles
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
   
        {/* Cartas de Cobertura Pendientes */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Cartas de Cobertura Pendientes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { id: 1, user: 'Juan Pérez', aseguradora: 'Seguros Universal', date: '2024-02-24' },
                { id: 2, user: 'María Rodríguez', aseguradora: 'Mapfre BHD', date: '2024-02-23' },
                { id: 3, user: 'Carlos Gómez', aseguradora: 'La Colonial', date: '2024-02-23' },
              ].map((carta) => (
                <div key={carta.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{carta.user}</p>
                      <p className="text-sm text-gray-500">{carta.aseguradora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{carta.date}</span>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Firmar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
   };