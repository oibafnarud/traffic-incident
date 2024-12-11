export const RecentIncidents = () => {
    const incidents = [
      {
        id: '1',
        date: '2024-03-22',
        time: '14:30',
        location: 'Av. 27 de Febrero esq. Abraham Lincoln',
        status: 'pending',
        participants: ['Juan Pérez', 'María Rodríguez'],
        severity: 'medium'
      },
      // Más incidentes de ejemplo...
    ];
   
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha/Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participantes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{incident.date}</div>
                  <div className="text-sm text-gray-500">{incident.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{incident.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {incident.participants.map((participant, index) => (
                      <div key={index} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        {participant.charAt(0)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${incident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      incident.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Ver detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
   };