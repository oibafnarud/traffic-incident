export const NotificationsPanel = () => {
    const notifications = [
      {
        id: '1',
        type: 'incident',
        message: 'Nuevo incidente reportado en Av. 27 de Febrero',
        time: '5 min ago',
        read: false
      },
      {
        id: '2',
        type: 'update',
        message: 'DIGESETT ha actualizado el estado del incidente #123',
        time: '15 min ago',
        read: false
      },
      {
        id: '3',
        type: 'complete',
        message: 'Incidente #120 ha sido resuelto',
        time: '1 hora ago',
        read: true
      },
      // Más notificaciones...
    ];
   
    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${
                  notification.type === 'incident' ? 'bg-red-400' :
                  notification.type === 'update' ? 'bg-blue-400' :
                  'bg-green-400'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
              {!notification.read && (
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 mt-4">
          Ver todas las notificaciones
        </button>
      </div>
    );
   };