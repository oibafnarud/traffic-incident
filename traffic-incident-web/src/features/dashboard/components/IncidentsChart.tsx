export const IncidentsChart = () => {
    // Datos de ejemplo para el gráfico
    const data = [
      { name: 'Ene', pendientes: 4, procesando: 3, completados: 8 },
      { name: 'Feb', pendientes: 3, procesando: 4, completados: 10 },
      { name: 'Mar', pendientes: 5, procesando: 2, completados: 7 },
      // Más datos...
    ];
   
    return (
      <div className="h-80">
        {/* Aquí irá el componente de gráfico real */}
        <div className="flex h-full items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col space-y-2">
              <div style={{height: `${item.completados * 10}%`}} className="bg-green-200"></div>
              <div style={{height: `${item.procesando * 10}%`}} className="bg-blue-200"></div>
              <div style={{height: `${item.pendientes * 10}%`}} className="bg-yellow-200"></div>
              <div className="text-xs text-gray-500">{item.name}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-200 mr-2"></div>
            <span className="text-sm text-gray-600">Pendientes</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-200 mr-2"></div>
            <span className="text-sm text-gray-600">Procesando</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-200 mr-2"></div>
            <span className="text-sm text-gray-600">Completados</span>
          </div>
        </div>
      </div>
    );
   };