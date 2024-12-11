// src/features/auth/AuthLayout.tsx
import { CarFront } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full mx-auto"> {/* Añadido mx-auto */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <CarFront className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1> {/* Aumentado tamaño */}
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>
      <div className="bg-white rounded-xl shadow-xl p-8"> {/* Aumentado padding */}
        {children}
      </div>
    </div>
  </div>
);