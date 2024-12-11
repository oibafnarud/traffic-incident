export const WorkshopDashboard = () => {
    const [quotes, setQuotes] = useState([]);
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Panel Taller</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex justify-between">
              <input
                type="text" 
                placeholder="Buscar cotización..."
                className="border rounded-lg px-3 py-2"
              />
              <select className="border rounded-lg px-3 py-2">
                <option>Todos los estados</option>
                <option>Pendientes</option>
                <option>Aprobadas</option>
              </select>
            </div>
          </div>
  
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incidente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map(quote => (
                <tr key={quote.id}>
                  {/* ... detalles de la cotización ... */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };