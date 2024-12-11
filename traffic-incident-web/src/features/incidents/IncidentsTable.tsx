export const IncidentsTable = () => {
    return (
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Participantes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irán los datos de incidentes */}
          </tbody>
        </table>
      </div>
    );
  };