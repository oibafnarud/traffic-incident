// src/features/insurance/InsurancePage.tsx
import { useState } from 'react';
import { Building2, MapPin, Phone, Mail, Plus, FileText } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { InsuranceForm } from './components/InsuranceForm';

interface Insurance {
 id: string;
 name: string;
 address: string;
 phone: string;
 email: string;
 coverageTypes: string[];
 status: 'active' | 'inactive';
 pendingClaims: number;
}

export const InsurancePage = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);

 const insuranceCompanies: Insurance[] = [
   {
     id: '1',
     name: 'Seguros Universal',
     address: 'Av. Winston Churchill #123',
     phone: '809-555-0123',
     email: 'contacto@universal.com',
     coverageTypes: ['Full', 'Terceros', 'Robo'],
     status: 'active',
     pendingClaims: 12
   }
 ];

 return (
   <div className="space-y-6">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold">Aseguradoras</h1>
       <button 
         onClick={() => setIsModalOpen(true)}
         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
       >
         <Plus size={20} />
         Nueva Aseguradora
       </button>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {insuranceCompanies.map(insurance => (
         <div key={insurance.id} className="bg-white rounded-xl shadow-sm p-6">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-100 rounded-lg">
                 <Building2 className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h3 className="font-medium">{insurance.name}</h3>
                 <div className="flex items-center gap-2">
                   <span className={`text-xs px-2 py-1 rounded-full ${
                     insurance.status === 'active' 
                       ? 'bg-green-100 text-green-800' 
                       : 'bg-red-100 text-red-800'
                   }`}>
                     {insurance.status === 'active' ? 'Activo' : 'Inactivo'}
                   </span>
                   <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                     {insurance.pendingClaims} reclamos pendientes
                   </span>
                 </div>
               </div>
             </div>
           </div>

           <div className="space-y-2 text-sm">
             <div className="flex items-center gap-2 text-gray-600">
               <MapPin size={16} />
               {insurance.address}
             </div>
             <div className="flex items-center gap-2 text-gray-600">
               <Phone size={16} />
               {insurance.phone}
             </div>
             <div className="flex items-center gap-2 text-gray-600">
               <Mail size={16} />
               {insurance.email}
             </div>
           </div>

           <div className="mt-4">
             <p className="text-sm text-gray-600 mb-2">Tipos de Cobertura:</p>
             <div className="flex flex-wrap gap-2">
               {insurance.coverageTypes.map(type => (
                 <span key={type} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                   {type}
                 </span>
               ))}
             </div>
           </div>

           <div className="mt-4 flex gap-2">
             <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded">
               Editar
             </button>
             <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded flex items-center justify-center gap-1">
               <FileText size={16} />
               Reclamos
             </button>
           </div>
         </div>
       ))}
     </div>

     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
       <InsuranceForm 
         onSubmit={(data) => {
           console.log('Insurance data:', data);
           setIsModalOpen(false);
         }}
         onCancel={() => setIsModalOpen(false)}
         initialData={selectedInsurance}
       />
     </Modal>
   </div>
 );
};