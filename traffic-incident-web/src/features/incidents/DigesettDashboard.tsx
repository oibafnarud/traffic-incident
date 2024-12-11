// src/features/incidents/DigesettDashboard.tsx
import { useState } from 'react';
import { 
 FileText, Search, Filter, ArrowLeft, Download, 
 Eye, AlertCircle, CheckCircle, Clock 
} from 'lucide-react';
import { DetailsTabs } from './components/DetailsTabs';
import { IncidentDetails } from './components/IncidentDetails';
import { IncidentDocuments } from './components/IncidentDocuments';
import { IncidentReport } from './components/IncidentReport';

interface Incident {
 id: string;
 participants: {
   user: string;
   vehicle: string;
   role: 'reporter' | 'involved';
   description?: string;
 }[];
 location: {
   coordinates: [number, number];
   address: string;
 };
 status: 'pending' | 'processing' | 'completed' | 'rejected';
 photos: string[];
 digesettReport?: {
   officerId: string;
   reportNumber: string;
   notes: string;
   createdAt: Date;
   signedAt?: Date;
 };
 insurance?: {
   company: string;
   claimNumber?: string;
   status: 'pending' | 'approved' | 'rejected';
 };
 createdAt: Date;
}

const mockIncidents: Incident[] = [
 {
   id: 'INC-2024-001',
   participants: [
     {
       user: 'Juan Pérez',
       vehicle: 'Toyota Corolla',
       role: 'reporter',
       description: 'Me encontraba detenido en el semáforo cuando fui impactado por detrás'
     },
     {
       user: 'María Rodríguez',
       vehicle: 'Honda Civic',
       role: 'involved',
       description: 'No pude frenar a tiempo'
     }
   ],
   location: {
     coordinates: [18.4861, -69.9312],
     address: 'Av. 27 de Febrero esq. Abraham Lincoln'
   },
   status: 'pending',
   photos: ['/photos/1.jpg', '/photos/2.jpg'],
   createdAt: new Date()
 }
];

type ViewType = 'list' | 'details' | 'documents' | 'report';

const statusFilters = [
 { value: 'all', label: 'Todos' },
 { value: 'pending', label: 'Pendientes' },
 { value: 'processing', label: 'En Proceso' },
 { value: 'completed', label: 'Completados' }
];

export const DigesettDashboard = () => {
 const [incidents] = useState<Incident[]>(mockIncidents);
 const [view, setView] = useState<ViewType>('list');
 const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
 const [statusFilter, setStatusFilter] = useState('all');
 const [searchTerm, setSearchTerm] = useState('');

 const statsData = {
   pendingActs: incidents.filter(i => !i.digesettReport).length,
   generatedActs: incidents.filter(i => i.digesettReport).length,
   signedActs: incidents.filter(i => i.digesettReport?.signedAt).length
 };

 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSearchTerm(e.target.value);
 };

 const handleSignAct = async (incident: Incident) => {
   try {
     // Implementar firma digital
     console.log('Firmando acta para incidente:', incident.id);
   } catch (error) {
     console.error('Error al firmar acta:', error);
   }
 };

 return (
   <div className="p-6">
     {/* Header y Filtros */}
     <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Panel DIGESETT</h1>
         <div className="flex gap-4">
           <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" />
             <input
               type="text"
               placeholder="Buscar por #, ubicación..."
               value={searchTerm}
               onChange={handleSearch}
               className="pl-10 pr-4 py-2 border rounded-lg w-64"
             />
           </div>
           <select
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="border rounded-lg px-4 py-2"
           >
             {statusFilters.map(filter => (
               <option key={filter.value} value={filter.value}>
                 {filter.label}
               </option>
             ))}
           </select>
         </div>
       </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-3 gap-6">
         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
           <h3 className="font-medium flex items-center gap-2">
             <Clock className="w-5 h-5 text-yellow-600" />
             Pendientes de Acta
           </h3>
           <p className="text-3xl font-bold text-yellow-600 mt-2">
             {statsData.pendingActs}
           </p>
         </div>
         <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
           <h3 className="font-medium flex items-center gap-2">
             <FileText className="w-5 h-5 text-blue-600" />
             Actas Generadas
           </h3>
           <p className="text-3xl font-bold text-blue-600 mt-2">
             {statsData.generatedActs}
           </p>
         </div>
         <div className="bg-green-50 border border-green-200 rounded-xl p-6">
           <h3 className="font-medium flex items-center gap-2">
             <CheckCircle className="w-5 h-5 text-green-600" />
             Actas Firmadas
           </h3>
           <p className="text-3xl font-bold text-green-600 mt-2">
             {statsData.signedActs}
           </p>
         </div>
       </div>

       {/* Vista Principal */}
       {view === 'list' ? (
         <div className="bg-white rounded-lg shadow">
           <table className="min-w-full">
             <thead className="bg-gray-50">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                   No. Incidente
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                   Fecha
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                   Ubicación
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                   Estado
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                   Acta
                 </th>
                 <th className="px-6 py-3"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
               {incidents.map((incident) => (
                 <tr key={incident.id} className="hover:bg-gray-50">
                   <td className="px-6 py-4">{incident.id}</td>
                   <td className="px-6 py-4">
                     {new Date(incident.createdAt).toLocaleDateString()}
                   </td>
                   <td className="px-6 py-4">{incident.location.address}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs
                       ${incident.status === 'completed' ? 'bg-green-100 text-green-800' :
                         incident.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                         'bg-yellow-100 text-yellow-800'
                       }`}
                     >
                       {incident.status}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     {incident.digesettReport ? (
                       incident.digesettReport.signedAt ? (
                         <span className="text-green-600 flex items-center gap-1">
                           <CheckCircle size={16} />
                           Firmada
                         </span>
                       ) : (
                         <span className="text-blue-600">Pendiente de firma</span>
                       )
                     ) : (
                       <span className="text-yellow-600">Sin generar</span>
                     )}
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button
                       onClick={() => {
                         setSelectedIncident(incident);
                         setView('details');
                       }}
                       className="text-blue-600 hover:text-blue-800"
                     >
                       Ver Detalles
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       ) : (
         // Vista detallada del incidente
         <div className="space-y-6">
           <div className="flex items-center justify-between">
             <button
               onClick={() => {
                 setView('list');
                 setSelectedIncident(null);
               }}
               className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
             >
               <ArrowLeft className="w-5 h-5" />
               Volver
             </button>
             {view === 'report' && !selectedIncident?.digesettReport?.signedAt && (
               <button
                 onClick={() => selectedIncident && handleSignAct(selectedIncident)}
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               >
                 <FileText className="w-4 h-4" />
                 Firmar Acta
               </button>
             )}
           </div>

           <DetailsTabs activeTab={view} onTabChange={setView} />

           {selectedIncident && (
             <>
               {view === 'details' && <IncidentDetails incident={selectedIncident} />}
               {view === 'documents' && <IncidentDocuments incident={selectedIncident} />}
               {view === 'report' && <IncidentReport incident={selectedIncident} />}
             </>
           )}
         </div>
       )}
     </div>
   </div>
 );
};