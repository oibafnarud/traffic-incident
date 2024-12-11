// src/features/vehicles/VehiclesPage.tsx
import { useState } from 'react';
import { Car, Plus, AlertCircle, CheckCircle, X } from 'lucide-react';

interface Vehicle {
 id: number;
 brand: string;
 model: string;
 year: number;
 plate: string;
 chasis: string;
 insurance: {
   company: string;
   policy: string;
   status: 'valid' | 'expired';
   expires: string;
 }
}

export const VehiclesPage = () => {
 const [showAddModal, setShowAddModal] = useState(false);
 const [vehicles, setVehicles] = useState<Vehicle[]>([
   {
     id: 1,
     brand: 'Toyota',
     model: 'Corolla',
     year: 2020,
     plate: 'ABC-123',
     chasis: '1HGCM82633A123456',
     insurance: {
       company: 'Universal',
       policy: 'POL-123456',
       status: 'valid',
       expires: '2024-12-31'
     }
   }
 ]);

 return (
   <>
     <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Mis Vehículos</h1>
         <button 
           onClick={() => setShowAddModal(true)}
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
         >
           <Plus size={20} />
           Añadir Vehículo
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {vehicles.map(vehicle => (
           <div key={vehicle.id} className="bg-white rounded-xl shadow-sm p-6">
             <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-blue-100 rounded-lg">
                 <Car className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h3 className="font-medium">{vehicle.brand} {vehicle.model}</h3>
                 <p className="text-sm text-gray-600">{vehicle.year}</p>
               </div>
             </div>

             <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Placa</span>
                 <span className="font-medium">{vehicle.plate}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Chasis</span>
                 <span className="font-medium">{vehicle.chasis}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Seguro</span>
                 <div className="text-right">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     vehicle.insurance.status === 'valid' 
                       ? 'bg-green-100 text-green-800' 
                       : 'bg-red-100 text-red-800'
                   }`}>
                     {vehicle.insurance.status === 'valid' ? 'Vigente' : 'Vencido'}
                   </span>
                   <p className="text-xs text-gray-500 mt-1">
                     Vence: {new Date(vehicle.insurance.expires).toLocaleDateString()}
                   </p>
                 </div>
               </div>
             </div>

             <div className="mt-4 flex gap-2">
               <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg">
                 Ver Detalles
               </button>
               <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg">
                 Editar
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* Modal Añadir Vehículo */}
     {showAddModal && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-semibold">Añadir Vehículo</h2>
             <button 
               onClick={() => setShowAddModal(false)}
               className="text-gray-500 hover:text-gray-700"
             >
               <X size={20} />
             </button>
           </div>

           <form className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Marca
                 </label>
                 <input
                   type="text"
                   className="w-full border rounded-lg px-3 py-2"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Modelo
                 </label>
                 <input
                   type="text"
                   className="w-full border rounded-lg px-3 py-2"
                 />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Año
                 </label>
                 <input
                   type="number"
                   className="w-full border rounded-lg px-3 py-2"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Placa
                 </label>
                 <input
                   type="text"
                   className="w-full border rounded-lg px-3 py-2"
                 />
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Chasis
               </label>
               <input
                 type="text"
                 className="w-full border rounded-lg px-3 py-2"
               />
             </div>

             <div className="border-t pt-4">
               <h3 className="font-medium mb-3">Información del Seguro</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Aseguradora
                   </label>
                   <input
                     type="text"
                     className="w-full border rounded-lg px-3 py-2"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     No. Póliza
                   </label>
                   <input
                     type="text"
                     className="w-full border rounded-lg px-3 py-2"
                   />
                 </div>
               </div>
               <div className="mt-4">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Fecha de Vencimiento
                 </label>
                 <input
                   type="date"
                   className="w-full border rounded-lg px-3 py-2"
                 />
               </div>
             </div>

             <div className="flex justify-end gap-3 pt-4">
               <button
                 type="button"
                 onClick={() => setShowAddModal(false)}
                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
               >
                 Cancelar
               </button>
               <button
                 type="submit"
                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               >
                 Guardar Vehículo
               </button>
             </div>
           </form>
         </div>
       </div>
     )}
   </>
 );
};