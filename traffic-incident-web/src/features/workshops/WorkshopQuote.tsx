import { useState } from 'react';
import { Camera, Upload, DollarSign } from 'lucide-react';

interface QuoteForm {
 labourCost: number;
 partsCost: number;
 estimatedDays: number;
 comments: string;
 photos: File[];
}

export const WorkshopQuote = () => {
 const [form, setForm] = useState<QuoteForm>({
   labourCost: 0,
   partsCost: 0,
   estimatedDays: 0,
   comments: '',
   photos: []
 });

 return (
   <div className="max-w-4xl mx-auto p-6">
     <div className="bg-white rounded-lg shadow p-6">
       <h1 className="text-2xl font-bold mb-6">Cotización de Reparación</h1>

       <div className="grid grid-cols-2 gap-6 mb-6">
         {/* Fotos del Daño */}
         <div>
           <h2 className="font-medium mb-4">Fotos del Incidente</h2>
           <div className="grid grid-cols-2 gap-4">
             {/* Aquí irían las fotos del incidente */}
           </div>
         </div>

         {/* Detalles del Vehículo */}
         <div>
           <h2 className="font-medium mb-4">Información del Vehículo</h2>
           <div className="space-y-2">
             <p><span className="text-gray-500">Marca/Modelo:</span> Toyota Corolla</p>
             <p><span className="text-gray-500">Año:</span> 2022</p>
             <p><span className="text-gray-500">Color:</span> Gris</p>
             <p><span className="text-gray-500">Placa:</span> ABC-123</p>
           </div>
         </div>
       </div>

       <form className="space-y-6">
         <div className="grid grid-cols-3 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Costo Mano de Obra
             </label>
             <div className="relative">
               <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={20} />
               <input
                 type="number"
                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
                 value={form.labourCost}
                 onChange={e => setForm({...form, labourCost: Number(e.target.value)})}
               />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Costo Piezas
             </label>
             <div className="relative">
               <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={20} />
               <input
                 type="number"
                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
                 value={form.partsCost}
                 onChange={e => setForm({...form, partsCost: Number(e.target.value)})}
               />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Días Estimados
             </label>
             <input
               type="number"
               className="w-full px-4 py-2 border rounded-lg"
               value={form.estimatedDays}
               onChange={e => setForm({...form, estimatedDays: Number(e.target.value)})}
             />
           </div>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             Fotos Adicionales
           </label>
           <div className="grid grid-cols-4 gap-4">
             <button className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500">
               <Upload size={24} />
               <span className="mt-2 text-sm">Subir foto</span>
             </button>
           </div>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             Comentarios
           </label>
           <textarea
             rows={4}
             className="w-full px-4 py-2 border rounded-lg"
             value={form.comments}
             onChange={e => setForm({...form, comments: e.target.value})}
             placeholder="Detalles adicionales sobre la reparación..."
           />
         </div>

         <div className="flex justify-end gap-4">
           <button type="button" className="px-6 py-2 border rounded-lg hover:bg-gray-50">
             Cancelar
           </button>
           <button
             type="submit" 
             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
           >
             Enviar Cotización
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};