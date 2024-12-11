export const UsersTable = () => {
    return (
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Cédula</th>
              <th>Vehículos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irán los datos de usuarios */}
          </tbody>
        </table>
      </div>
    );
  };