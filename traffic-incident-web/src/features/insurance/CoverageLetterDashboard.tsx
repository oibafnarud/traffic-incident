// src/features/insurance/CoverageLetterDashboard.tsx
import { useState } from 'react';
import { Check, X, FileText, Download, Eye, Calendar } from 'lucide-react';

interface CoverageRequest {
 id: string;
 incidentId: string;
 requestDate: string;
 status: 'pending' | 'processing' | 'completed' | 'rejected';
 client: {
   name: string;
   cedula: string;
   policyNumber: string;
   vehicle: {
     brand: string;
     model: string;
     year: string;
     plate: string;
     chasis: string;
   };
   documents: {
     type: 'cedula' | 'insurance_card' | 'registration' | 'digesett_report';
     fileUrl: string;
     verified: boolean;
   }[];
 };
 coverage?: {
   letterNumber: string;
   generatedAt: string;
   signedBy?: string;
   fileUrl?: string;
   details: {
     policyLimit: number;
     deductible: number;
     coverageType: string;
   };
 };
}

// Agregar los datos mock al inicio del archivo, después de las interfaces:

const mockRequests: CoverageRequest[] = [{
    id: 'REQ-2024-001',
    incidentId: 'INC-2024-001',
    requestDate: '2024-01-15 14:30',
    status: 'pending',
    client: {
      name: 'Juan Pérez',
      cedula: '001-1234567-8',
      policyNumber: 'POL-987654',
      vehicle: {
        brand: 'Toyota',
        model: 'Corolla',
        year: '2022',
        plate: 'ABC-123',
        chasis: '1HGCM82633A123456'
      },
      documents: [
        { type: 'cedula', fileUrl: '/docs/cedula.pdf', verified: true },
        { type: 'insurance_card', fileUrl: '/docs/insurance.pdf', verified: true },
        { type: 'registration', fileUrl: '/docs/registration.pdf', verified: true },
        { type: 'digesett_report', fileUrl: '/docs/report.pdf', verified: true }
      ]
    }
   }];

export const CoverageLetterDashboard = () => {
    const [requests, setRequests] = useState<CoverageRequest[]>(mockRequests);
    const [selectedRequest, setSelectedRequest] = useState<CoverageRequest | null>(null);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
   
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Solicitudes de Carta de Cobertura</h1>
   
        <div className="bg-white rounded-lg shadow">
          {/* Tabla de solicitudes */}
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Solicitud</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Póliza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documentos</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{request.id}</p>
                      <p className="text-sm text-gray-500">Inc. #{request.incidentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{request.client.name}</td>
                  <td className="px-6 py-4">{request.client.policyNumber}</td>
                  <td className="px-6 py-4 text-sm">{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status === 'completed' ? 'Completada' :
                       request.status === 'processing' ? 'En Proceso' :
                       request.status === 'rejected' ? 'Rechazada' : 
                       'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {request.client.documents.map((doc, i) => (
                        <span key={i} className={`flex items-center gap-1 text-xs ${
                          doc.verified ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {doc.verified ? <Check size={12} /> : <X size={12} />}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {request.coverage ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => window.open(request.coverage?.fileUrl)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowPreviewModal(true);
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowGenerateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Generar Carta
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
   
        {/* Modal para Generar Carta */}
        {showGenerateModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h3 className="text-lg font-semibold">Generar Carta de Cobertura</h3>
                  <p className="text-sm text-gray-500">Solicitud #{selectedRequest.id}</p>
                </div>
                <button 
                  onClick={() => setShowGenerateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
   
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Información del Cliente */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Información del Cliente</h4>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Cliente</label>
                        <p className="font-medium">{selectedRequest.client.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Póliza</label>
                        <p className="font-medium">{selectedRequest.client.policyNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Vehículo</label>
                        <p className="font-medium">
                          {selectedRequest.client.vehicle.brand} {selectedRequest.client.vehicle.model} {selectedRequest.client.vehicle.year}
                        </p>
                      </div>
                    </div>
                  </div>
   
                  {/* Documentos */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Documentos Verificados</h4>
                    <div className="grid gap-2">
                      {selectedRequest.client.documents.map((doc, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(doc.fileUrl)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => window.open(doc.fileUrl)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Download size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
   
                <div className="border-t mt-6 pt-6">
                  <h4 className="font-medium mb-4">Detalles de la Carta</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Límite de Cobertura
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deducible
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Cobertura
                      </label>
                      <select className="w-full border rounded-lg px-3 py-2">
                        <option>Seleccionar...</option>
                        <option>Daños Propios</option>
                        <option>Responsabilidad Civil</option>
                        <option>Comprensivo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
   
              <div className="flex justify-end gap-3 p-6 border-t">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Generar y Firmar
                </button>
              </div>
            </div>
          </div>
        )}              

     {/* Modal Vista Previa */}
     {showPreviewModal && selectedRequest?.coverage && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
           <div className="p-6">
             <div className="flex justify-between items-start mb-6">
               <h3 className="text-lg font-semibold">Vista Previa de Carta</h3>
               <button 
                 onClick={() => setShowPreviewModal(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <X size={20} />
               </button>
             </div>

             {/* Contenido de la carta */}
             <div className="space-y-6">
               {/* ... contenido de la carta ... */}
             </div>

             <div className="flex justify-end gap-3 mt-6">
               <button
                 onClick={() => setShowPreviewModal(false)}
                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
               >
                 Cerrar
               </button>
               <button
                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                 onClick={() => window.print()}
               >
                 Imprimir
               </button>
             </div>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};