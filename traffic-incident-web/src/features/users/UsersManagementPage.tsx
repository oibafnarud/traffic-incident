import { useState } from 'react';
import { User, Shield, Mail, Check, X } from 'lucide-react';

interface User {
 id: string;
 name: string;
 email: string;
 role: 'user' | 'admin' | 'digesett';
 status: 'active' | 'pending' | 'blocked';
 documents: {
   type: string;
   verified: boolean;
 }[];
}

export const UsersManagementPage = () => {
 const [users, setUsers] = useState<User[]>([]);
 const [filter, setFilter] = useState('all');

 return (
   <div className="p-6 space-y-6">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
       <div className="flex gap-3">
         <select 
           className="border rounded-lg px-3 py-2"
           value={filter}
           onChange={(e) => setFilter(e.target.value)}
         >
           <option value="all">Todos</option>
           <option value="pending">Pendientes</option>
           <option value="active">Activos</option>
           <option value="blocked">Bloqueados</option>
         </select>
       </div>
     </div>

     <div className="bg-white rounded-lg shadow">
       <table className="min-w-full">
         <thead>
           <tr className="border-b">
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documentos</th>
             <th className="px-6 py-3"></th>
           </tr>
         </thead>
         <tbody className="divide-y">
           {users.map(user => (
             <tr key={user.id}>
               <td className="px-6 py-4">
                 <div className="flex items-center">
                   <User className="w-8 h-8 text-gray-400" />
                   <div className="ml-3">
                     <p className="font-medium">{user.name}</p>
                   </div>
                 </div>
               </td>
               <td className="px-6 py-4">{user.email}</td>
               <td className="px-6 py-4">
                 <span className={`px-2 py-1 rounded-full text-xs ${
                   user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                   user.role === 'digesett' ? 'bg-blue-100 text-blue-800' :
                   'bg-gray-100 text-gray-800'
                 }`}>
                   {user.role}
                 </span>
               </td>
               <td className="px-6 py-4">
                 <span className={`px-2 py-1 rounded-full text-xs ${
                   user.status === 'active' ? 'bg-green-100 text-green-800' :
                   user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-red-100 text-red-800'
                 }`}>
                   {user.status}
                 </span>
               </td>
               <td className="px-6 py-4">
                 <div className="flex gap-1">
                   {user.documents.map((doc, i) => (
                     <div 
                       key={i}
                       className={`w-2 h-2 rounded-full ${
                         doc.verified ? 'bg-green-400' : 'bg-gray-300'
                       }`}
                     />
                   ))}
                 </div>
               </td>
               <td className="px-6 py-4 text-right">
                 <button className="text-blue-600 hover:text-blue-800">
                   Ver detalles
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 );
};
