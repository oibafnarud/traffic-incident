const DocumentsList = ({ incident }: { incident: Incident }) => {
    return (
      <div className="space-y-4">
        {incident.documents.map(doc => (
          <div 
            key={doc.id}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{doc.type}</h4>
                <p className="text-sm text-gray-600">
                  Creado: {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={doc.status} />
            </div>
            
            <DocumentSignatures document={doc} />
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => viewDocument(doc)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Ver documento
              </button>
              {doc.status === 'pending' && canSign(doc) && (
                <button
                  onClick={() => signDocument(doc)}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Firmar
                </button>
              )}
              {doc.status === 'signed' && (
                <button
                  onClick={() => downloadDocument(doc)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Descargar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };