import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
 const [email, setEmail] = useState('');
 const [submitted, setSubmitted] = useState(false);

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-md w-full space-y-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Recuperar Contraseña
         </h2>
         <p className="mt-2 text-center text-sm text-gray-600">
           Ingresa tu correo electrónico y te enviaremos las instrucciones
         </p>
       </div>

       {!submitted ? (
         <form className="mt-8 space-y-6">
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <label htmlFor="email" className="sr-only">Email</label>
               <input
                 id="email"
                 name="email"
                 type="email"
                 required
                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
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
               Enviar Instrucciones
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
           <h3 className="text-lg font-medium text-gray-900">Revisa tu correo</h3>
           <p className="mt-2 text-sm text-gray-600">
             Hemos enviado las instrucciones para recuperar tu contraseña a {email}
           </p>
           <p className="mt-4 text-sm">
             ¿No recibiste el correo?{' '}
             <button 
               className="text-blue-600 hover:text-blue-500"
               onClick={() => setSubmitted(false)}
             >
               Intentar nuevamente
             </button>
           </p>
         </div>
       )}

       <div className="text-center">
         <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
           Volver al inicio de sesión
         </Link>
       </div>
     </div>
   </div>
 );
};