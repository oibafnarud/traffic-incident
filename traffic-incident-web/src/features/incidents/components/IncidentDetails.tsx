// src/features/incidents/components/IncidentDetails.tsx
import { User, Car, MapPin, Clock, FileText } from 'lucide-react';

export const IncidentDetails = ({ incident }: IncidentDetailsProps) => {
 return (
   <div className="grid grid-cols-3 gap-6">
     <div className="col-span-2 space-y-6">
       <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5" />
           Información del Incidente
         </h3>
         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-500">Número de Caso</label>
             <p className="mt-1 text-lg">#123-456</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Estado</label>
             <span className="mt-1 inline-block px-2.5 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
               Pendiente
             </span>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Fecha</label>
             <p className="mt-1">27/11/2024</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Hora</label>
             <p className="mt-1">14:30</p>
           </div>
         </div>
       </div>

       {/* Participante 1 */}
       <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <User className="w-5 h-5" />
           Conductor Reportante
         </h3>
         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-500">Nombre</label>
             <p className="mt-1">Juan Pérez</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Cédula</label>
             <p className="mt-1">001-1234567-8</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Licencia</label>
             <p className="mt-1">LIC-12345</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Teléfono</label>
             <p className="mt-1">(809) 555-1234</p>
           </div>
         </div>

         <div className="mt-6">
           <h4 className="font-medium mb-3 flex items-center gap-2">
             <Car className="w-4 h-4" />
             Vehículo
           </h4>
           <div className="grid grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-gray-500">Marca/Modelo</label>
               <p className="mt-1">Toyota Corolla</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Año</label>
               <p className="mt-1">2022</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Placa</label>
               <p className="mt-1">ABC-123</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Color</label>
               <p className="mt-1">Gris</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Aseguradora</label>
               <p className="mt-1">Seguros Universal</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Póliza</label>
               <p className="mt-1">POL-987654</p>
             </div>
           </div>
         </div>
       </div>

       {/* Participante 2 */}
       <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <User className="w-5 h-5" />
           Conductor Involucrado
         </h3>
         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-500">Nombre</label>
             <p className="mt-1">María Rodríguez</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Cédula</label>
             <p className="mt-1">001-8765432-1</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Licencia</label>
             <p className="mt-1">LIC-67890</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-500">Teléfono</label>
             <p className="mt-1">(809) 555-5678</p>
           </div>
         </div>

         <div className="mt-6">
           <h4 className="font-medium mb-3 flex items-center gap-2">
             <Car className="w-4 h-4" />
             Vehículo
           </h4>
           <div className="grid grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-gray-500">Marca/Modelo</label>
               <p className="mt-1">Honda Civic</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Año</label>
               <p className="mt-1">2021</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Placa</label>
               <p className="mt-1">XYZ-789</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Color</label>
               <p className="mt-1">Blanco</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Aseguradora</label>
               <p className="mt-1">Mapfre</p>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-500">Póliza</label>
               <p className="mt-1">POL-123456</p>
             </div>
           </div>
         </div>
       </div>
     </div>

     <div className="space-y-6">
       <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <MapPin className="w-5 h-5" />
           Ubicación
         </h3>
         <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
           Mapa
         </div>
         <p className="text-gray-600">Av. 27 de Febrero esq. Abraham Lincoln, Santo Domingo, DN</p>
       </div>

       <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <Clock className="w-5 h-5" />
           Línea de Tiempo
         </h3>
         <div className="space-y-4">
           <div className="flex gap-3">
             <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
             <div>
               <p className="text-sm text-gray-500">27/11/2024 14:30</p>
               <p className="font-medium">Incidente reportado</p>
             </div>
           </div>
           <div className="flex gap-3">
             <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
             <div>
               <p className="text-sm text-gray-500">Pendiente</p>
               <p className="font-medium">Revisión DIGESETT</p>
             </div>
           </div>
           <div className="flex gap-3">
             <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
             <div>
               <p className="text-sm text-gray-500">Pendiente</p>
               <p className="font-medium">Acta generada</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};