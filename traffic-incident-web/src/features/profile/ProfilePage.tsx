// src/features/profile/ProfilePage.tsx
import { useState } from 'react';
import { User, Mail, Phone, FileText, Key, Shield, Upload, X, Check } from 'lucide-react';
import QRCode from 'react-qr-code';

interface UserProfile {
 clientId: string;
 name: string;
 cedula: string;
 email: string;
 phone: string;
 vehicles: Array<{
   plate: string;
   brand: string;
   model: string;
 }>;
}

interface Document {
 id: string;
 type: 'cedula_front' | 'cedula_back' | 'license' | 'registration' | 'sale_act';
 status: 'pending' | 'verified' | 'rejected';
 fileUrl?: string;
 expiry?: string;
 comments?: string;
}

interface DocumentRequirement {
 type: Document['type'];
 label: string;
 description: string;
 required: boolean;
 allowedTypes: string[];
 maxSize: number;
 requiresExpiry?: boolean;
}

const DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
 {
   type: 'cedula_front',
   label: 'Cédula (Frente)',
   description: 'Imagen clara del frente de su cédula',
   required: true,
   allowedTypes: ['image/jpeg', 'image/png'],
   maxSize: 5
 },
 {
   type: 'cedula_back',
   label: 'Cédula (Reverso)',
   description: 'Imagen clara del reverso de su cédula',
   required: true,
   allowedTypes: ['image/jpeg', 'image/png'],
   maxSize: 5
 },
 {
   type: 'license',
   label: 'Licencia de Conducir',
   description: 'Licencia de conducir vigente',
   required: true,
   allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
   maxSize: 5,
   requiresExpiry: true
 },
 {
   type: 'registration',
   label: 'Matrícula del Vehículo',
   description: 'Matrícula original del vehículo',
   required: true,
   allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
   maxSize: 5
 },
 {
   type: 'sale_act',
   label: 'Acto de Venta',
   description: 'Acto de venta legalizado por la Procuraduría',
   required: false,
   allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
   maxSize: 5
 }
];

export const ProfilePage = () => {
 const [selectedDocType, setSelectedDocType] = useState<Document['type']>();
 const [showUploadModal, setShowUploadModal] = useState(false);
 const [documents, setDocuments] = useState<Document[]>([
   { 
     id: '1',
     type: 'cedula_front', 
     status: 'verified', 
     fileUrl: '/docs/cedula-front.jpg'
   }
   // ... otros documentos
 ]);

 const userInfo: UserProfile = {
   clientId: "CLI-2024-001",
   name: "Juan Carlos Pérez",
   cedula: "000-0000000-0",
   email: "juan.perez@email.com",
   phone: "+1 809-555-0123",
   vehicles: [
     { plate: "ABC-123", brand: "Toyota", model: "Corolla" }
   ]
 };

 const getStatusColor = (status: Document['status']) => ({
   verified: 'bg-green-100 text-green-800',
   rejected: 'bg-red-100 text-red-800',
   pending: 'bg-yellow-100 text-yellow-800'
 }[status]);

 const handleOpenUpload = (type: Document['type']) => {
   setSelectedDocType(type);
   setShowUploadModal(true);
 };

 const handleUpload = async (file: File) => {
   // Implementar lógica de carga
 };

 return (
   <div className="max-w-7xl mx-auto px-4 py-6">
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* Columna Principal */}
       <div className="lg:col-span-2 space-y-6">
         {/* Información Personal */}
         <div className="bg-white rounded-xl shadow-sm">
           <div className="p-6">
             <h2 className="text-lg font-semibold mb-4">Información Personal</h2>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm text-gray-500">Nombre</label>
                 <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded">
                   <User size={18} className="text-gray-400" />
                   <span>{userInfo.name}</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm text-gray-500">Cédula</label>
                 <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded">
                   <FileText size={18} className="text-gray-400" />
                   <span>{userInfo.cedula}</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm text-gray-500">Email</label>
                 <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded">
                   <Mail size={18} className="text-gray-400" />
                   <span>{userInfo.email}</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm text-gray-500">Teléfono</label>
                 <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded">
                   <Phone size={18} className="text-gray-400" />
                   <span>{userInfo.phone}</span>
                 </div>
               </div>
             </div>
           </div>

           <div className="px-6 pb-6">
             <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded">
               Editar Información
             </button>
           </div>
         </div>

         {/* Documentos Requeridos */}
         <div className="bg-white rounded-xl shadow-sm p-6">
           <h2 className="text-lg font-semibold mb-4">Documentos Requeridos</h2>
           
           <div className="grid md:grid-cols-2 gap-4">
             {DOCUMENT_REQUIREMENTS.map(req => {
               const doc = documents.find(d => d.type === req.type);
               return (
                 <div key={req.type} className="border rounded-lg p-4">
                   <div className="flex justify-between items-start mb-3">
                     <div>
                       <h3 className="font-medium">{req.label}</h3>
                       {doc ? (
                         <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                           {doc.status === 'verified' ? 'Verificado' : 
                            doc.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                         </span>
                       ) : (
                         <span className="text-xs text-gray-500">
                           {req.required ? 'Requerido' : 'Opcional'}
                         </span>
                       )}
                     </div>
                     
                     {doc?.expiry && (
                       <span className="text-xs text-gray-500">
                         Vence: {new Date(doc.expiry).toLocaleDateString()}
                       </span>
                     )}
                   </div>

                   {doc?.fileUrl ? (
                     <div className="relative group">
                       <img 
                         src={doc.fileUrl} 
                         alt={req.label}
                         className="w-full h-32 object-cover rounded"
                       />
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                         <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                           <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm">
                             Ver
                           </button>
                           <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm">
                             Actualizar
                           </button>
                         </div>
                       </div>
                     </div>
                   ) : (
                     <button
                       onClick={() => handleOpenUpload(req.type)}
                       className="w-full h-32 border-2 border-dashed rounded flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600 hover:border-blue-600"
                     >
                       <Upload size={24} />
                       <span className="text-sm">Subir documento</span>
                       <span className="text-xs">
                         {req.allowedTypes.map(t => t.split('/')[1]).join(', ')} - Máx {req.maxSize}MB
                       </span>
                     </button>
                   )}

                   {doc?.status === 'rejected' && doc.comments && (
                     <p className="mt-2 text-sm text-red-600">
                       {doc.comments}
                     </p>
                   )}
                 </div>
               );
             })}
           </div>
         </div>
       </div>

       {/* Columna Lateral */}
       <div className="space-y-6">
         {/* Código QR */}
         <div className="bg-white rounded-xl shadow-sm p-6">
           <h2 className="text-lg font-semibold mb-4">Código de Cliente</h2>
           <div className="flex flex-col items-center space-y-4">
             <div className="bg-white p-4 rounded-lg">
               <QRCode 
                 value={JSON.stringify({
                   clientId: userInfo.clientId,
                   name: userInfo.name,
                   cedula: userInfo.cedula
                 })}
                 size={200}
                 style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                 viewBox={`0 0 256 256`}
               />
             </div>
             <div className="text-center">
               <p className="font-medium">ID: {userInfo.clientId}</p>
               <p className="text-sm text-gray-500">
                 Use este código para identificarse en caso de accidente
               </p>
             </div>
           </div>
         </div>

         {/* Resumen */}
         <div className="bg-white rounded-xl shadow-sm p-6">
           <h2 className="text-lg font-semibold mb-4">Resumen</h2>
           <div className="space-y-4">
             <div>
               <p className="text-sm text-gray-500">Vehículos Registrados</p>
               <p className="text-2xl font-semibold">{userInfo.vehicles.length}</p>
             </div>
             <div>
               <p className="text-sm text-gray-500">Documentos Verificados</p>
               <p className="text-2xl font-semibold">
                 {documents.filter(d => d.status === 'verified').length}
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-500">Documentos Pendientes</p>
               <p className="text-2xl font-semibold">
                 {DOCUMENT_REQUIREMENTS.length - documents.length}
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Modal de Subida de Documentos */}
     {showUploadModal && selectedDocType && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg max-w-lg w-full mx-4">
           <div className="p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-semibold">
                 Subir {DOCUMENT_REQUIREMENTS.find(r => r.type === selectedDocType)?.label}
               </h3>
               <button 
                 onClick={() => setShowUploadModal(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <X size={20} />
               </button>
             </div>

             <div className="space-y-4">
               <div className="border-2 border-dashed rounded-lg p-8">
                 <div className="flex flex-col items-center">
                   <Upload size={32} className="text-gray-400 mb-4" />
                   <p className="text-sm text-gray-600 text-center mb-4">
                     Arrastra y suelta tu documento aquí o<br />
                     <button className="text-blue-600 hover:text-blue-700">
                       selecciona un archivo
                     </button>
                   </p>
                   <p className="text-xs text-gray-500">
                     {DOCUMENT_REQUIREMENTS.find(r => r.type === selectedDocType)?.description}
                   </p>
                 </div>
               </div>

               {DOCUMENT_REQUIREMENTS.find(r => r.type === selectedDocType)?.requiresExpiry && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Fecha de vencimiento
                   </label>
                   <input
                     type="date"
                     className="w-full border rounded-lg px-3 py-2"
                   />
                 </div>
               )}

               <div className="flex justify-end gap-3">
                 <button
                   onClick={() => setShowUploadModal(false)}
                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                 >
                   Cancelar
                 </button>
                 <button
                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                 >
                   Subir Documento
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};