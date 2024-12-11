import { useState } from 'react';
import { Clock, FileText, CheckCircle2, AlertTriangle, Car, MapPin } from 'lucide-react';

interface Claim {
  id: string;
  incidentId: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  type: 'coverage_letter' | 'accident_claim';
  createdAt: string;
  updatedAt: string;
  insuranceCompany: {
    id: string;
    name: string;
  };
  vehicle: {
    brand: string;
    model: string;
    plate: string;
  };
  documents: {
    id: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
  }[];
  timeline: {
    date: string;
    status: string;
    description: string;
    actor: string;
  }[];
}

export const ClaimTrackingPanel = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [claims, setClaims] = useState<Claim[]>([]);

  const statusInfo = {
    pending: {
      color: 'yellow',
      icon: Clock,
      label: 'Pendiente'
    },
    reviewing: {
      color: 'blue',
      icon: FileText,
      label: 'En revisión'
    },
    approved: {
      color: 'green',
      icon: CheckCircle2,
      label: 'Aprobado'
    },
    rejected: {
      color: 'red',
      icon: AlertTriangle,
      label: 'Rechazado'
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Activos
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Completados
          </button>
        </nav>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {claims.map(claim => (
          <div key={claim.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {claim.type === 'coverage_letter' ? (
                    <FileText className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Car className="w-5 h-5 text-blue-500" />
                  )}
                  <h3 className="font-medium">
                    {claim.type === 'coverage_letter' ? 'Carta de Cobertura' : 'Reclamo de Accidente'}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {claim.insuranceCompany.name}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm bg-${statusInfo[claim.status].color}-100 text-${statusInfo[claim.status].color}-800`}>
                {statusInfo[claim.status].label}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Vehículo</p>
                <p className="font-medium">{claim.vehicle.brand} {claim.vehicle.model}</p>
                <p className="text-sm text-gray-600">{claim.vehicle.plate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha de solicitud</p>
                <p className="font-medium">
                  {new Date(claim.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Documents Status */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Documentos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {claim.documents.map(doc => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{doc.type}</span>
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                        doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-medium mb-2">Seguimiento</h4>
              <div className="space-y-3">
                {claim.timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>
                      {index !== claim.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-100 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">{event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-2">
              <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded">
                Ver detalles
              </button>
              <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded">
                Descargar documentos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};