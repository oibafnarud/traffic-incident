// En IncidentDetails.tsx
const ActionButtons = ({ incident }: { incident: Incident }) => {
    return (
      <div className="flex gap-2">
        {!incident.isResponsible ? (
          // Solicitante de carta de cobertura
          <button
            onClick={() => requestCoverageLetter(incident.id)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Shield className="w-4 h-4" />
            Solicitar Carta de Cobertura
          </button>
        ) : (
          // Responsable del accidente
          <button
            onClick={() => signInsuranceDeclaration(incident.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText className="w-4 h-4" />
            Firmar Declaración
          </button>
        )}
      </div>
    );
  };