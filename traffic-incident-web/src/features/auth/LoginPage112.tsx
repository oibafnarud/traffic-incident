// src/features/auth/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarFront } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { toast } from 'sonner';

interface FormData {
 email: string;
 password: string;
}

export const LoginPage = () => {
 const navigate = useNavigate();
 const { login } = useAuth();
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState<FormData>({
   email: '',
   password: ''
 });
 const [errors, setErrors] = useState<Record<string, string>>({});

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     setIsLoading(true);
     setErrors({});
     
     const response = await authService.login(formData.email, formData.password);
     
     // Guardar el token
     localStorage.setItem('token', response.data.token);

     // Guardar el usuario en el contexto
     login({
       email: response.data.user.email,
       role: response.data.user.role
     });

     // Redireccionar según rol
     switch(response.data.user.role) {
       case 'client':
         navigate('/user');
         break;
       case 'digesett':
         navigate('/digesett');
         break;
       case 'insurance_agent':
         navigate('/insurance-agent');
         break;
       case 'admin':
         navigate('/admin');
         break;
       default:
         navigate('/user');
     }

     toast.success('Inicio de sesión exitoso');

   } catch (error: any) {
     console.error('Error durante el login:', error);
     toast.error(error.response?.data?.message || 'Error al iniciar sesión');
     setErrors({ 
       general: error.response?.data?.message || 'Error al iniciar sesión' 
     });
   } finally {
     setIsLoading(false);
   }
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));
   if (errors[name]) {
     setErrors(prev => ({
       ...prev,
       [name]: ''
     }));
   }
 };

 return (
   <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
     <div className="w-full max-w-md mx-auto p-6">
       {/* Header */}
       <div className="flex flex-col items-center justify-center mb-8">
         <div className="bg-blue-600 p-3 rounded-lg mb-4 shadow-lg transform transition-transform hover:scale-105">
           <CarFront className="w-8 h-8 text-white" />
         </div>
         <h2 className="text-2xl font-bold text-center text-gray-900">
           Bienvenido de nuevo
         </h2>
         <p className="mt-2 text-center text-gray-600">
           Ingresa tus credenciales para continuar
         </p>
       </div>

       {/* Card del formulario */}
       <div className="bg-white rounded-xl shadow-lg p-8">
         <form onSubmit={handleSubmit} className="space-y-6">
           {errors.general && (
             <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
               {errors.general}
             </div>
           )}
           
           <Input
             label="Correo electrónico"
             type="email"
             name="email"
             placeholder="ejemplo@correo.com"
             value={formData.email}
             onChange={handleInputChange}
             error={errors.email}
             required
           />

           <Input
             label="Contraseña"
             type="password"
             name="password"
             placeholder="••••••••"
             value={formData.password}
             onChange={handleInputChange}
             error={errors.password}
             required
           />
           
           <div className="flex items-center justify-between">
             <label className="flex items-center">
               <input 
                 type="checkbox" 
                 className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
               />
               <span className="ml-2 text-sm text-gray-600">Recordarme</span>
             </label>
             <a 
               href="/forgot-password" 
               className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
             >
               ¿Olvidaste tu contraseña?
             </a>
           </div>

           <Button 
             type="submit" 
             isLoading={isLoading}
             className="w-full"
           >
             Iniciar Sesión
           </Button>

           <p className="text-center text-sm text-gray-600">
             ¿No tienes una cuenta?{' '}
             <a 
               href="/register" 
               className="text-blue-600 hover:text-blue-700 transition-colors"
             >
               Regístrate aquí
             </a>
           </p>
         </form>
       </div>
     </div>
   </div>
 );
};