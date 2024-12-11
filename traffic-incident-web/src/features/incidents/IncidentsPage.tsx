// src/features/incidents/IncidentsPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
 FileText, User, Phone, Calendar, Shield, 
 Search, Filter, ArrowLeft, Download, Eye, 
 Send, AlertCircle 
} from 'lucide-react';
import { DetailsTabs } from './components/DetailsTabs';
import { IncidentDetails } from './components/IncidentDetails';
import { IncidentDocuments } from './components/IncidentDocuments'; 
import { IncidentReport } from './components/IncidentReport';
import { IncidentsList } from './components/IncidentsList';
import { DigitalSignature } from './utils/digitalSignature';

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
 isResponsible?: boolean;
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

type ViewType = 'list' | 'details' | 'documents' | 'report';

const statusFilters = [
 { value: 'all', label: 'Todos' },
 { value: 'pending', label: 'Pendientes' },
 { value: 'processing', label: 'En Proceso' },
 { value: 'completed', label: 'Completados' },
 { value: 'rejected', label: 'Rechazados' }
];

export const IncidentsPage = () => {
 const [view, setView] = useState<ViewType>('list');
 const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
 const [statusFilter, setStatusFilter] = useState('all');
 const [searchTerm, setSearchTerm] = useState('');

 const handleSearch = (term: string) => {
   setSearchTerm(term);
 };

 const handleFilterChange = (status: string) => {
   setStatusFilter(status);
 };

 const handleSelectIncident = (incident: Incident) => {
   setSelectedIncident(incident);
   setView('details');
 };

 const handleDownload = async () => {
   // Implementar lógica de descarga
 };

 return (
   <div className="space-y-6">
     {/* Header Principal */}
     <div className="flex justify-between items-center">
       <div className="flex items-center gap-4">
         {view !== 'list' && (
           <button
             onClick={() => setView('list')}
             className="text-gray-600 hover:text-gray-900"
           >
             <ArrowLeft className="w-6 h-6" />
           </button>
         )}
         <h1 className="text-2xl font-bold">
           {view === 'list' ? 'Mis Incidentes' : 
            view === 'details' ? `Incidente #${selectedIncident?.id}` :
            'Generar Acta'}
         </h1>
       </div>

       {view === 'list' && (
         <Link 
           to="/incidents/new"
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
         >
           <AlertCircle size={20} />
           Reportar Incidente
         </Link>
       )}
     </div>

     {/* Vista de Lista */}
        {view === 'list' && (
      <IncidentsList
        onSelect={handleSelectIncident}
        statusFilter={statusFilter}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        statusFilters={statusFilters}
      />
    )}

     {/* Vista de Detalles/Documentos/Acta */}
     {view !== 'list' && selectedIncident && (
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <button
               onClick={() => {
                 setView('list');
                 setSelectedIncident(null);
               }}
               className="p-2 hover:bg-gray-100 rounded-full"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-semibold">
               Incidente #{selectedIncident.id}
             </h2>
           </div>
           <div className="flex gap-2">
             <button
               onClick={handleDownload}
               className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
             >
               <Download className="w-4 h-4" />
               Descargar
             </button>
             {!selectedIncident.isResponsible ? (
               <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                 <Shield className="w-4 h-4" />
                 Solicitar Carta de Cobertura
               </button>
             ) : (
               <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                 <FileText className="w-4 h-4" />
                 Firmar Declaración
               </button>
             )}
           </div>
         </div>

         <DetailsTabs activeTab={view} onTabChange={setView} />

         {view === 'details' && <IncidentDetails incident={selectedIncident} />}
         {view === 'documents' && <IncidentDocuments incident={selectedIncident} />}
         {view === 'report' && <IncidentReport incident={selectedIncident} />}
       </div>
     )}
   </div>
 );
};