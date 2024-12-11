import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-7xl"> {/* Ajustado aquí */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};