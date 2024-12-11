// src/features/auth/RegisterPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CarFront } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cedula: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    cedula: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      setErrors({ general: 'Error al crear la cuenta' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-lg mb-4 shadow-lg transform transition-transform hover:scale-105">
            <CarFront className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Ingresa tus datos para registrarte
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                error={errors.firstName}
              />
              <Input
                label="Apellido"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                error={errors.lastName}
              />
            </div>

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={errors.email}
            />

            <Input
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={(e) => setFormData({...formData, cedula: e.target.value})}
              error={errors.cedula}
            />

            <Input
              label="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              error={errors.phone}
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              error={errors.password}
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              error={errors.confirmPassword}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Acepto los términos y condiciones
              </label>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!acceptTerms || isLoading}
            >
              Crear cuenta
            </Button>

            <div className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};