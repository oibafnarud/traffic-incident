const DigitalSignatureModal = ({ 
    document, 
    onSign, 
    onCancel 
  }: { 
    document: IncidentDocument;
    onSign: (signature: string) => Promise<void>;
    onCancel: () => void;
  }) => {
    const [signature, setSignature] = useState('');
    const [pin, setPin] = useState('');
  
    const handleSign = async () => {
      try {
        // Aquí iría la lógica de firma digital
        // Podría incluir:
        // 1. Verificación de PIN
        // 2. Generación de firma digital
        // 3. Timestamp
        const digitalSignature = await generateDigitalSignature(pin);
        await onSign(digitalSignature);
      } catch (error) {
        console.error('Error al firmar:', error);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-medium mb-4">Firma Digital</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Documento a firmar
              </label>
              <p className="text-sm text-gray-600">{document.type}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                PIN de Firma Digital
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-2 border rounded"
                maxLength={6}
              />
            </div>
  
            <div className="flex gap-2 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSign}
                disabled={!pin}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Firmar Documento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };