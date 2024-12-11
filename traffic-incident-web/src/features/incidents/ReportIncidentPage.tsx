// src/features/incidents/ReportIncidentPage.tsx
import { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { Camera, MapPin, Car, FileText, Smartphone } from 'lucide-react';

interface Vehicle {
 id: string;
 plate: string;
 brand: string;
 model: string;
 year: string;
}

interface PartyInfo {
 name: string;
 phone: string;
 cedula: string;
 license: string;
 hasApp: boolean;
 vehicle?: Vehicle;
}

export const ReportIncidentPage = () => {
 const [step, setStep] = useState(1);
 const [reportFlow, setReportFlow] = useState<'withApp'|'withoutApp'>('withApp');
 const [selectedVehicle, setSelectedVehicle] = useState<string>('');
 const [otherPartyInfo, setOtherPartyInfo] = useState<PartyInfo | null>(null);
 const [description, setDescription] = useState('');
 const [photos, setPhotos] = useState({
   cedula: null,
   license: null,
   vehicle: null,
   damage: null,
   scene: null
 });
 const [location, setLocation] = useState('');

 const myVehicles: Vehicle[] = [
   { id: '1', plate: 'ABC123', brand: 'Toyota', model: 'Corolla', year: '2020' },
   { id: '2', plate: 'XYZ789', brand: 'Honda', model: 'CRV', year: '2019' }
 ];

 const handleQRScan = (data: any) => {
   if (data) {
     setOtherPartyInfo(JSON.parse(data.text));
     setStep(2);
   }
 };

 const renderInitialStep = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">¿La otra parte tiene la app?</h2>
     <div className="space-y-4">
       <button 
         onClick={() => {
           setReportFlow('withApp');
           setStep(2);
         }}
         className="w-full p-4 border rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
       >
         <Smartphone size={20} />
         Sí, escanear código QR
       </button>
       <button
         onClick={() => {
           setReportFlow('withoutApp');
           setStep(2);
         }}
         className="w-full p-4 border rounded-lg hover:bg-blue-50"
       >
         No, registro manual
       </button>
     </div>
   </div>
 );

 const renderQRScanner = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Escanear Código QR</h2>
     <div className="aspect-square relative rounded-lg overflow-hidden">
       <QrScanner
         onScan={handleQRScan}
         onError={(error) => console.error(error)}
         style={{ width: '100%' }}
       />
     </div>
   </div>
 );

 const renderManualPartyRegistration = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Información del otro conductor</h2>
     <div className="space-y-4">
       <input 
         type="text"
         placeholder="Nombre completo"
         className="w-full p-2 border rounded"
       />
       <input 
         type="tel"
         placeholder="Teléfono"
         className="w-full p-2 border rounded"
       />
       
       <div className="border-2 border-dashed rounded-lg p-4">
         <p className="text-center mb-2">Foto de Cédula</p>
         <button className="w-full bg-blue-50 text-blue-600 p-2 rounded flex items-center justify-center gap-2">
           <Camera size={20} />
           Tomar foto
         </button>
       </div>

       <div className="border-2 border-dashed rounded-lg p-4">
         <p className="text-center mb-2">Foto de Licencia</p>
         <button className="w-full bg-blue-50 text-blue-600 p-2 rounded flex items-center justify-center gap-2">
           <Camera size={20} />
           Tomar foto
         </button>
       </div>

       <div className="mt-6">
         <p className="text-sm text-gray-600 text-center mb-4">
           Se enviará un SMS al otro conductor para completar su registro
         </p>
         <button 
           onClick={() => setStep(3)} 
           className="w-full bg-blue-600 text-white p-3 rounded-lg"
         >
           Continuar
         </button>
       </div>
     </div>
   </div>
 );

 const renderVehicleSelection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Seleccionar Tu Vehículo</h2>
     <div className="space-y-4">
       {myVehicles.map(vehicle => (
         <label 
           key={vehicle.id}
           className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
             selectedVehicle === vehicle.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
           }`}
         >
           <input
             type="radio"
             name="vehicle"
             value={vehicle.id}
             checked={selectedVehicle === vehicle.id}
             onChange={(e) => setSelectedVehicle(e.target.value)}
             className="hidden"
           />
           <div className="flex justify-between items-center">
             <div>
               <p className="font-medium">{vehicle.brand} {vehicle.model} {vehicle.year}</p>
               <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
             </div>
             <Car className={selectedVehicle === vehicle.id ? 'text-blue-500' : 'text-gray-400'} />
           </div>
         </label>
       ))}
     </div>

     <button
       onClick={() => setStep(4)}
       disabled={!selectedVehicle}
       className={`mt-6 w-full p-3 rounded-lg ${
         selectedVehicle 
           ? 'bg-blue-600 text-white hover:bg-blue-700' 
           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
       }`}
     >
       Continuar
     </button>
   </div>
 );

 const renderPhotos = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Fotos del Incidente</h2>
     <div className="grid grid-cols-2 gap-4">
       {[
         { key: 'vehicle', label: 'Tu Vehículo' },
         { key: 'damage', label: 'Daños' },
         { key: 'scene', label: 'Escena Completa' },
         { key: 'additional', label: 'Fotos Adicionales' }
       ].map((item) => (
         <div key={item.key} className="border-2 border-dashed rounded-lg p-4">
           <p className="text-center mb-2">{item.label}</p>
           <button className="w-full bg-blue-50 text-blue-600 p-2 rounded flex items-center justify-center gap-2">
             <Camera size={20} />
             Tomar foto
           </button>
         </div>
       ))}
     </div>
     
     <button
       onClick={() => setStep(5)}
       className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg"
     >
       Continuar
     </button>
   </div>
 );

 const renderLocation = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Ubicación del Incidente</h2>
     <div className="space-y-4">
       <div className="flex gap-2">
         <input
           type="text"
           placeholder="Dirección exacta"
           className="flex-1 p-2 border rounded"
           value={location}
           onChange={(e) => setLocation(e.target.value)}
         />
         <button className="p-2 bg-blue-100 text-blue-600 rounded">
           <MapPin size={20} />
         </button>
       </div>

       <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
         Mapa placeholder
       </div>

       <button
         onClick={() => setStep(6)}
         className="w-full bg-blue-600 text-white p-3 rounded-lg"
       >
         Confirmar Ubicación
       </button>
     </div>
   </div>
 );

 const renderDescription = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
     <h2 className="text-lg font-medium mb-4">Descripción del Incidente</h2>
     <div className="space-y-4">
       <textarea
         className="w-full p-3 border rounded-lg h-32"
         placeholder="Describe detalladamente cómo ocurrió el incidente..."
         value={description}
         onChange={(e) => setDescription(e.target.value)}
       />

       <button
         onClick={() => setStep(7)}
         disabled={!description}
         className={`w-full p-3 rounded-lg ${
           description
             ? 'bg-blue-600 text-white hover:bg-blue-700'
             : 'bg-gray-100 text-gray-400 cursor-not-allowed'
         }`}
       >
         Finalizar Reporte
       </button>
     </div>
   </div>
 );

 return (
   <div className="max-w-2xl mx-auto space-y-6">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold">Reportar Incidente</h1>
       <div className="text-sm text-gray-600">
         Paso {step} de 7
       </div>
     </div>

     {step === 1 && renderInitialStep()}
     {step === 2 && (reportFlow === 'withApp' ? renderQRScanner() : renderManualPartyRegistration())}
     {step === 3 && renderVehicleSelection()}
     {step === 4 && renderPhotos()}
     {step === 5 && renderLocation()}
     {step === 6 && renderDescription()}
     {step === 7 && (
       <div className="bg-white rounded-xl shadow-sm p-6 text-center">
         <h2 className="text-lg font-medium mb-4">¡Reporte Completado!</h2>
         <p className="text-gray-600">
           {reportFlow === 'withoutApp' 
             ? 'Se ha enviado una notificación al otro conductor para completar su parte del reporte.'
             : 'El reporte ha sido enviado exitosamente.'}
         </p>
       </div>
     )}
   </div>
 );
};