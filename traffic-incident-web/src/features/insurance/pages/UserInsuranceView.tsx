export const UserInsuranceView = () => {
    const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
    const [insuranceCompanies, setInsuranceCompanies] = useState([]);
   
    useEffect(() => {
      // Cargar lista de aseguradoras
      const fetchInsuranceCompanies = async () => {
        const response = await fetch('/api/insurance/companies');
        const data = await response.json();
        setInsuranceCompanies(data);
      };
   
      fetchInsuranceCompanies();
    }, []);
   
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Validación de Seguro</h2>
   
        {!selectedInsurance ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceCompanies.map(company => (
              <button
                key={company.id}
                onClick={() => setSelectedInsurance(company.id)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium mb-2">{company.name}</h3>
                <p className="text-sm text-gray-600">
                  Haga clic para validar su póliza
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedInsurance(null)}
              className="text-blue-600 mb-4 hover:underline"
            >
              ← Volver a la lista de aseguradoras
            </button>
            
            <PolicyValidation
              insuranceCompany={insuranceCompanies.find(c => c.id === selectedInsurance)}
              onValidationComplete={(isValid) => {
                // Manejar el resultado de la validación
                console.log('Validación completada:', isValid);
              }}
            />
          </div>
        )}
      </div>
    );
   };