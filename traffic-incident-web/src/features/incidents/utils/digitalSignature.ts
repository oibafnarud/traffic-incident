interface IncidentDocument {
  id: string;
  type: 'acta' | 'coverage_letter' | 'insurance_declaration';
  status: 'pending' | 'signed' | 'approved' | 'rejected';
  signatures: {
    userId: string;
    name: string;
    role: 'driver1' | 'driver2' | 'officer' | 'insurance';
    signedAt?: string;
    digitalSignature?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Componente para mostrar estado de firmas
const DocumentSignatures = ({ document }: { document: IncidentDocument }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Firmas requeridas</h4>
      <div className="grid grid-cols-2 gap-2">
        {document.signatures.map(signature => (
          <div 
            key={signature.userId}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded"
          >
            <div className={`w-2 h-2 rounded-full ${
              signature.signedAt ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm">{signature.name}</span>
            {signature.signedAt && (
              <span className="text-xs text-gray-500">
                {new Date(signature.signedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};