// src/features/incidents/components/IncidentDocuments.tsx
export const IncidentDocuments = ({ incident }: IncidentDocumentsProps) => {
  const documents = [
    { id: 1, name: 'Acta policial', status: 'pending', type: 'PDF' },
    { id: 2, name: 'Carta aseguradora', status: 'completed', type: 'PDF' },
    { id: 3, name: 'Fotos del incidente', status: 'completed', type: 'IMG' },
    { id: 4, name: 'Declaración jurada', status: 'pending', type: 'PDF' }
  ];
 
  // Si existen participantes, agregar sus documentos
  const participantDocuments = incident?.participants ? incident.participants.flatMap(participant => [
    { 
      id: `cedula-${participant.user}`,
      name: `Cédula - ${participant.user}`,
      status: participant.documents?.cedula?.verified ? 'completed' : 'pending',
      type: 'IMG',
      fileUrl: participant.documents?.cedula?.fileUrl
    },
    {
      id: `license-${participant.user}`,
      name: `Licencia - ${participant.user}`,
      status: participant.documents?.license?.verified ? 'completed' : 'pending',
      type: 'IMG',
      fileUrl: participant.documents?.license?.fileUrl
    },
    {
      id: `registration-${participant.user}`,
      name: `Matrícula - ${participant.user}`,
      status: participant.documents?.vehicleRegistration?.verified ? 'completed' : 'pending',
      type: 'IMG',
      fileUrl: participant.documents?.vehicleRegistration?.fileUrl
    }
  ]) : [];
 
  const allDocuments = [...documents, ...participantDocuments];
  
  return (
    <div className="grid grid-cols-2 gap-6">
      {allDocuments.map(doc => (
        <div key={doc.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">{doc.name}</h4>
              <p className="text-sm text-gray-500">{doc.type}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-sm ${
              doc.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {doc.status === 'completed' ? 'Verificado' : 'Pendiente'}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => doc.fileUrl && window.open(doc.fileUrl)}
              className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
            >
              Ver
            </button>
            <button className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50">
              Descargar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
 };