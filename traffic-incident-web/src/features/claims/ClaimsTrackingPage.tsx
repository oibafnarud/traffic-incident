import { useState, useEffect } from 'react';
import { 
  Car, Clock, Tool, FileText, 
  DollarSign, MapPin, Phone, Calendar 
} from 'lucide-react';

interface Claim {
  id: string;
  incidentId: string;
  status: 'pending' | 'approved' | 'in_repair' | 'completed' | 'rejected';
  insurance: {
    company: string;
    claimNumber: string;
    adjuster: {
      name: string;
      phone: string;
      email: string;
    };
  };
  workshop?: {
    name: string;
    address: string;
    phone: string;
    estimatedCompletionDate?: string;
    progress?: number;
    cost?: number;
  };
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
}

export const ClaimsTrackingPage = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      in_repair: 'bg-blue-100 text-blue-800',
      completed: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seguimiento de Reclamos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Reclamos */}
        <div className="lg:col-span-1 space-y-4">
          {claims.map(claim => (
            <button
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedClaim?.id === claim.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm text-gray-500">
                    Reclamo #{claim.insurance.claimNumber}
                  </span>
                  <h3 className="font-medium">{claim.insurance.company}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusColor(claim.status)
                }`}>
                  {claim.status === 'pending' && 'Pendiente'}
                  {claim.status === 'approved' && 'Aprobado'}
                  {claim.status === 'in_repair' && 'En Reparación'}
                  {claim.status === 'completed' && 'Completado'}
                  {claim.status === 'rejected' && 'Rechazado'}
                </span>
              </div>
              {claim.workshop && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tool className="w-4 h-4" />
                  {claim.workshop.name}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Detalles del Reclamo */}
        {selectedClaim ? (
          <div className="lg:col-span-2 space-y-6">
            {/* Información General */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Detalles del Reclamo</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Aseguradora</span>
                  <p className="font-medium">{selectedClaim.insurance.company}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Número de Reclamo</span>
                  <p className="font-medium">{selectedClaim.insurance.claimNumber}</p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Ajustador Asignado</h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-gray-500">Nombre:</span>
                    {selectedClaim.insurance.adjuster.name}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedClaim.insurance.adjuster.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Taller */}
            {selectedClaim.workshop && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Información del Taller</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{selectedClaim.workshop.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedClaim.workshop.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p>{selectedClaim.workshop.phone}</p>
                  </div>

                  {selectedClaim.workshop.estimatedCompletionDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Fecha estimada de entrega
                        </p>
                        <p className="font-medium">
                          {selectedClaim.workshop.estimatedCompletionDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Barra de Progreso */}
                  {selectedClaim.workshop.progress && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso de Reparación</span>
                        <span>{selectedClaim.workshop.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${selectedClaim.workshop.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Línea de Tiempo */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Historial del Reclamo</h2>
              
              <div className="space-y-6">
                {selectedClaim.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      {index < selectedClaim.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-200" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center h-96 bg-gray-50 rounded-lg">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                Selecciona un reclamo para ver los detalles
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};