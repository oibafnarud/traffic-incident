// src/components/Layout/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { UserCircle, LogOut, AlertCircle } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="w-full bg-white shadow">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link to={isAdmin ? "/admin" : "/user"} className="flex items-center text-xl font-semibold">
            Traffic Incident System
          </Link>

          <div className="hidden sm:flex items-center space-x-8">
            {isAdmin ? (
              <>
                <Link to="/admin/UsersPage">Usuarios</Link>
                <Link to="/admin/workshops">Talleres</Link>
                <Link to="/admin/insurance">Aseguradoras</Link>
              </>
            ) : (
              <>
                <Link to="/user/vehicles">Mis Vehículos</Link>
                <Link to="/user/incidents">Mis Incidentes</Link>
                <Link to="/user/profile">Mi Perfil</Link>
                <Link 
                  to="/user/report-incident"
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
                >
                  <AlertCircle size={16} />
                  Reportar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};