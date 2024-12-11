import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Loader } from 'lucide-react';

interface PolicyValidationProps {
 insuranceCompany: {
   id: string;
   name: string;
   apiIntegration?: {
     enabled: boolean;
   };
 };
 onValidationComplete: (isValid: boolean) => void;
}

export const PolicyValidation = ({ insuranceCompany, onValidationComplete }: PolicyValidationProps) => {
 const [policyNumber, setPolicyNumber] = useState('');
 const [status, setStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
 const [errorMessage, setErrorMessage] = useState('');

 const validatePolicy = async () => {
   if (!policyNumber.trim()) {
     setErrorMessage('Por favor ingrese el número de póliza');
     return;
   }

   setStatus('validating');
   setErrorMessage('');

   try {
     if (insuranceCompany.apiIntegration?.enabled) {
       // Validación automática vía API
       const response = await fetch(`/api/insurance/${insuranceCompany.id}/validate-policy`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ policyNumber }),
       });

       const data = await response.json();
       
       if (data.valid) {
         setStatus('valid');
         onValidationComplete(true);
       } else {
         setStatus('invalid');
         setErrorMessage(data.message || 'Póliza no encontrada o inválida');
         onValidationComplete(false);
       }
     } else {
       // Enviar solicitud manual de validación
       await fetch(`/api/insurance/validation-requests`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           insuranceCompanyId: insuranceCompany.id,
           policyNumber,
         }),
       });

       setStatus('validating');
       setErrorMessage('Solicitud de validación enviada. Te notificaremos cuando sea procesada.');
     }
   } catch (error) {
     setStatus('invalid');
     setErrorMessage('Error al validar la póliza. Por favor intente nuevamente.');
   }
 };

 return (
   <div className="bg-white rounded-lg shadow-sm p-6">
     <div className="flex items-center gap-3 mb-4">
       <Shield className="w-6 h-6 text-blue-600" />
       <h3 className="text-lg font-medium">Validar Póliza - {insuranceCompany.name}</h3>
     </div>

     <div className="space-y-4">
       <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
           Número de Póliza
         </label>
         <div className="flex gap-2">
           <input
             type="text"
             value={policyNumber}
             onChange={(e) => setPolicyNumber(e.target.value)}
             className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
             placeholder="Ingrese su número de póliza"
             disabled={status === 'validating'}
           />
           <button
             onClick={validatePolicy}
             disabled={status === 'validating'}
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
           >
             {status === 'validating' ? (
               <>
                 <Loader className="w-4 h-4 animate-spin" />
                 Validando...
               </>
             ) : (
               'Validar'
             )}
           </button>
         </div>
       </div>

       {/* Estado de la validación */}
       {status === 'valid' && (
         <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
           <CheckCircle className="w-5 h-5" />
           <span>Póliza verificada correctamente</span>
         </div>
       )}

       {status === 'invalid' && (
         <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
           <XCircle className="w-5 h-5" />
           <span>{errorMessage}</span>
         </div>
       )}

       {status === 'validating' && !insuranceCompany.apiIntegration?.enabled && (
         <div className="bg-yellow-50 p-4 rounded-lg">
           <h4 className="font-medium text-yellow-800 mb-2">Proceso de Validación Manual</h4>
           <p className="text-sm text-yellow-700">
             La validación de su póliza será procesada manualmente por la aseguradora. 
             Recibirá una notificación cuando el proceso esté completado.
           </p>
         </div>
       )}

       {/* Información adicional */}
       <div className="mt-4 text-sm text-gray-600">
         <h4 className="font-medium mb-2">Documentación requerida:</h4>
         <ul className="list-disc list-inside space-y-1">
           <li>Foto de la póliza vigente</li>
           <li>Cédula del titular</li>
           <li>Matrícula del vehículo</li>
         </ul>
       </div>
     </div>
   </div>
 );
};