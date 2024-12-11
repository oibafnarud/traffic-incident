// src/features/incidents/ReportIncident.tsx
import { useState } from 'react';
import { Camera, Upload, MapPin } from 'lucide-react';

export const ReportIncident = () => {
 const [step, setStep] = useState(1);
 const [photos, setPhotos] = useState([]);
 const [location, setLocation] = useState(null);

 return (
   <div className="max-w-2xl mx-auto p-6">
     <h1 className="text-2xl font-bold mb-6">Reportar Incidente</h1>

     {step === 1 && (
       <div className="space-y-6">
         <div>
           <h2 className="font-medium mb-4">Ubicación</h2>
           <button 
             onClick={() => navigator.geolocation.getCurrentPosition(
               pos => setLocation({lat: pos.coords.latitude, lng: pos.coords.longitude})
             )}
             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
           >
             <MapPin size={20} />
             Obtener Ubicación
           </button>
           {location && (
             <div className="mt-2 bg-gray-50 p-4 rounded">
               <p>Lat: {location.lat}</p>
               <p>Lng: {location.lng}</p>
             </div>
           )}
         </div>

         <div>
           <h2 className="font-medium mb-4">Fotos del Incidente</h2>
           <div className="grid grid-cols-2 gap-4">
             <button className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500">
               <Camera size={24} />
               <span className="mt-2 text-sm">Daños de su vehículo</span>
             </button>
             <button className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500">
               <Camera size={24} />
               <span className="mt-2 text-sm">Posición vehículos</span>
             </button>
           </div>
         </div>

         <button 
           onClick={() => setStep(2)}
           className="w-full bg-blue-600 text-white py-2 rounded-lg"
         >
           Continuar
         </button>
       </div>
     )}

     {step === 2 && (
       <div className="space-y-6">
         <h2 className="font-medium mb-4">Identificar Otro Involucrado</h2>
         
         <div className="flex gap-4">
           <button className="flex-1 border rounded-lg p-4 text-center hover:bg-gray-50">
             <Upload size={24} className="mx-auto mb-2" />
             Escanear QR
           </button>
           <button className="flex-1 border rounded-lg p-4 text-center hover:bg-gray-50">
             Buscar por Placa
           </button>
         </div>

         <button 
           onClick={() => setStep(3)}
           className="w-full bg-blue-600 text-white py-2 rounded-lg"
         >
           Continuar
         </button>
       </div>
     )}

     {step === 3 && (
       <div className="space-y-6">
         <h2 className="font-medium mb-4">Declaración</h2>
         
         <textarea
           rows={4}
           className="w-full border rounded-lg p-3"
           placeholder="Describa brevemente cómo ocurrió el incidente..."
         />

         <button 
           className="w-full bg-blue-600 text-white py-2 rounded-lg"
         >
           Enviar Reporte
         </button>
       </div>
     )}
   </div>
 );
};