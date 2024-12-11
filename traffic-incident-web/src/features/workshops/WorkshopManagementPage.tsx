import { useState } from 'react';
import { 
  Wrench, Calendar, Clock, DollarSign, 
  Camera, MessageCircle, Car, Tool 
} from 'lucide-react';

interface RepairJob {
  id: string;
  vehicle: {
    brand: string;
    model: string;
    year: string;
    plate: string;
  };
  owner: {
    name: string;
    phone: string;
  };
  insurance: {
    company: string;
    claimNumber: string;
  };
  status: 'pending' | 'in_progress' | 'waiting_parts' | 'completed';
  startDate: string;
  estimatedEndDate: string;
  progress: number;
  cost: {
    estimated: number;
    current: number;
  };
  photos: {
    before: string[];
    progress: string[];
    after: string[];
  };
  notes: {
    date: string;
    text: string;
    author: string;
  }[];
}

export const WorkshopManagementPage = () => {
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [selectedJob, setSelectedJob] = useState<RepairJob | null>(null);
  const [repairJobs, setRepairJobs] = useState<RepairJob[]>([]);

  const updateProgress = (jobId: string, progress: number) => {
    // Actualizar progreso en la BD
  };

  const addNote = (jobId: string, note: string) => {
    // Agregar nota al trabajo
  };

  const addPhotos = (jobId: string, photos: File[], type: 'before' | 'progress' | 'after') => {
    // Subir fotos
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Reparaciones</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveView('list')}
            className={`px-3 py-2 rounded-lg ${
              activeView === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Lista
          </button>
          <button 
            onClick={() => setActiveView('calendar')}
            className={`px-3 py-2 rounded-lg ${
              activeView === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Calendario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Trabajos */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              {repairJobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedJob?.id === job.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        {job.vehicle.brand} {job.vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {job.vehicle.plate}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'waiting_parts' ? 'bg-yellow-100 text-yellow-800' :
                      job.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status === 'in_progress' ? 'En Proceso' :
                       job.status === 'waiting_parts' ? 'Esperando Repuestos' :
                       job.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.progress}%
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(job.estimatedEndDate).toLocaleDateString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detalles del Trabajo */}
        <div className="lg:col-span-2">
          {selectedJob ? (
            <div className="space-y-6">
              {/* Información General */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Detalles de Reparación</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Cliente</span>
                    <p className="font-medium">{selectedJob.owner.name}</p>
                    <p className="text-sm text-gray-600">{selectedJob.owner.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Seguro</span>
                    <p className="font-medium">{selectedJob.insurance.company}</p>
                    <p className="text-sm text-gray-600">
                      Reclamo #{selectedJob.insurance.claimNumber}
                    </p>
                  </div>
                </div>

                {/* Progreso */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso de Reparación</span>
                    <span>{selectedJob.progress}%</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${selectedJob.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Costos */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Presupuesto Estimado</p>
                      <p className="text-lg font-medium">
                        ${selectedJob.cost.estimated.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Costo Actual</p>
                      <p className="text-lg font-medium">
                        ${selectedJob.cost.current.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fotos */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Registro Fotográfico</h2>
                
                <div className="space-y-4">
                  {['before', 'progress', 'after'].map((stage) => (
                    <div key={stage}>
                      <h3 className="font-medium mb-2 capitalize">{stage}</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedJob.photos[stage].map((photo, index) => (
                          <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`${stage} ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                        <button className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Notas y Actualizaciones</h2>
                
                <div className="space-y-4">
                  {selectedJob.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <p className="text-sm">{note.text}</p>
                      </div>
                      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                        <span>{note.author}</span>
                        <span>{new Date(note.date).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Agregar nota..."
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Selecciona un trabajo para ver los detalles
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};