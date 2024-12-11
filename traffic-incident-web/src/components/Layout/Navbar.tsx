// src/components/Layout/Navbar.tsx
// src/components/Layout/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { UserCircle, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Actualizar esta importación

// src/components/Layout/Navbar.tsx
// ... imports se mantienen igual ...

export const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDigesett = location.pathname.startsWith('/digesett');

  return (
    <nav className="w-full bg-white shadow">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo a la izquierda */}
          <Link 
            to={isAdmin ? "/admin" : isDigesett ? "/digesett" : "/user"} 
            className="flex-shrink-0 flex items-center text-xl font-semibold"
          >
            Traffic Incident System
          </Link>

          {/* Contenedor para todos los elementos de la derecha */}
          <div className="flex items-center space-x-8">
            {/* Menús según el rol */}
            <div className="hidden sm:flex items-center space-x-8">
              {isAdmin ? (
                <>
                  <Link to="/admin/users" className={`hover:text-blue-600 ${
                    location.pathname === '/admin/users' ? 'text-blue-600' : ''
                  }`}>Usuarios</Link>
                  <Link to="/admin/workshops" className={`hover:text-blue-600 ${
                    location.pathname === '/admin/workshops' ? 'text-blue-600' : ''
                  }`}>Talleres</Link>
                  <Link to="/admin/insurance-companies" className={`hover:text-blue-600 ${
                    location.pathname === '/admin/insurance-companies' ? 'text-blue-600' : ''
                  }`}>Aseguradoras</Link>
                </>
              ) : isDigesett ? (
                <>
                  <Link to="/digesett/incidents" className={`hover:text-blue-600 ${
                    location.pathname === '/digesett/incidents' ? 'text-blue-600' : ''
                  }`}>Incidentes</Link>
                  <Link to="/digesett/reports" className={`hover:text-blue-600 ${
                    location.pathname === '/digesett/reports' ? 'text-blue-600' : ''
                  }`}>Reportes</Link>
                  <Link to="/digesett/statistics" className={`hover:text-blue-600 ${
                    location.pathname === '/digesett/statistics' ? 'text-blue-600' : ''
                  }`}>Estadísticas</Link>
                </>
              ) : (
                <>
                  <Link to="/user/vehicles" className={`hover:text-blue-600 ${
                    location.pathname === '/user/vehicles' ? 'text-blue-600' : ''
                  }`}>Mis Vehículos</Link>
                  <Link to="/user/incidents" className={`hover:text-blue-600 ${
                    location.pathname === '/user/incidents' ? 'text-blue-600' : ''
                  }`}>Mis Incidentes</Link>
                  <Link to="/user/profile" className={`hover:text-blue-600 ${
                    location.pathname === '/user/profile' ? 'text-blue-600' : ''
                  }`}>Mi Perfil</Link>
                  <Link to="/user/report-incident" 
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
                  >
                    <AlertCircle size={16} />
                    Reportar
                  </Link>
                </>
              )}
            </div>

            {/* Iconos de perfil y logout */}
            <div className="flex items-center space-x-4">
              <Link to={`${isAdmin ? '/admin' : isDigesett ? '/digesett' : '/user'}/profile`}>
                <UserCircle className="w-6 h-6" />
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};