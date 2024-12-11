import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
 const [formData, setFormData] = useState({
   password: '',
   confirmPassword: ''
 });
 const [submitted, setSubmitted] = useState(false);

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-md w-full space-y-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Restablecer Contraseña
         </h2>
         <p className="mt-2 text-center text-sm text-gray-600">
           Ingresa tu nueva contraseña
         </p>
       </div>

       {!submitted ? (
         <form className="mt-8 space-y-6">
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <label htmlFor="password" className="sr-only">Nueva Contraseña</label>
               <input
                 id="password"
                 name="password"
                 type="password"
                 required
                 className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                 placeholder="Nueva Contraseña"
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
               />
             </div>
             <div>
               <label htmlFor="confirm-password" className="sr-only">Confirmar Nueva Contraseña</label>
               <input
                 id="confirm-password"
                 name="confirm-password"
                 type="password"
                 required
                 className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                 placeholder="Confirmar Nueva Contraseña"
                 value={formData.confirmPassword}
                 onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
               />
             </div>
           </div>

           <div>
             <button
               type="submit"
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               onClick={(e) => {
                 e.preventDefault();
                 setSubmitted(true);
               }}
             >
               Restablecer Contraseña
             </button>
           </div>
         </form>
       ) : (
         <div className="text-center">
           <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
             <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
           </div>
           <h3 className="text-lg font-medium text-gray-900">¡Contraseña actualizada!</h3>
           <p className="mt-2 text-sm text-gray-600">
             Tu contraseña ha sido restablecida exitosamente
           </p>
           <div className="mt-4">
             <Link
               to="/login"
               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
             >
               Ir al inicio de sesión
             </Link>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};