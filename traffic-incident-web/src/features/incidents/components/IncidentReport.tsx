// src/features/incidents/components/IncidentReport.tsx
import { FileText, Users, MapPin, Car, Shield } from 'lucide-react';

export const IncidentReport = ({ incident }: IncidentReportProps) => {
 return (
   <div className="max-w-[8.5in] mx-auto bg-white shadow">
     <div className="p-6 space-y-4" style={{ minHeight: '11in' }}>
       {/* Encabezado */}
       <div className="text-center border-b pb-4">
         <h2 className="text-xl font-bold">DIRECCIÓN GENERAL DE SEGURIDAD DE TRÁNSITO Y TRANSPORTE TERRESTRE</h2>
         <p className="text-lg">ACTA DE TRÁNSITO</p>
         <div className="mt-2 flex justify-between text-sm">
           <p>No. Acta: DGT-2024-123456</p>
           <p>Fecha: 27/11/2024</p>
         </div>
       </div>

       {/* Info Accidente - Más compacto */}
       <div className="grid grid-cols-4 gap-3 text-sm">
         <div>
           <label className="text-xs font-medium text-gray-500">Fecha</label>
           <p>27/11/2024</p>
         </div>
         <div>
           <label className="text-xs font-medium text-gray-500">Hora</label>
           <p>14:30</p>
         </div>
         <div className="col-span-2">
           <label className="text-xs font-medium text-gray-500">Dirección</label>
           <p>Av. 27 de Febrero esq. Abraham Lincoln, Piantini</p>
         </div>
       </div>

       {/* Añadir sección de responsabilidad */}
       <div className="border-t pt-3">
         <h3 className="text-sm font-semibold mb-2 text-red-600">DECLARACIÓN DE RESPONSABILIDAD</h3>
         <div className="bg-red-50 border border-red-100 rounded p-2 text-sm">
           <p className="font-medium">
             El conductor del vehículo 2 asume la responsabilidad del accidente.
           </p>
         </div>
       </div>

       {/* Conductor 1 - Más compacto */}
       <div className="border-t pt-3">
         <h3 className="text-sm font-semibold mb-2">CONDUCTOR 1 - REPORTANTE</h3>
         <div className="grid grid-cols-4 gap-3 text-sm">
           <div className="col-span-2">
             <label className="text-xs font-medium text-gray-500">Nombre</label>
             <p>Juan Pérez Méndez</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Cédula</label>
             <p>001-1234567-8</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Licencia</label>
             <p>LIC-12345</p>
           </div>
         </div>
         {/* Vehículo 1 */}
         <div className="mt-2 grid grid-cols-4 gap-3 text-sm">
           <div>
             <label className="text-xs font-medium text-gray-500">Vehículo</label>
             <p>Toyota Corolla 2022</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Placa</label>
             <p>ABC-123</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Seguro</label>
             <p>Universal</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Póliza</label>
             <p>POL-987654</p>
           </div>
         </div>
       </div>

       {/* Conductor 2 - Similar estructura */}
       <div className="border-t pt-3">
         <h3 className="text-sm font-semibold mb-2">CONDUCTOR 2 - REPORTANTE</h3>
         <div className="grid grid-cols-4 gap-3 text-sm">
           <div className="col-span-2">
             <label className="text-xs font-medium text-gray-500">Nombre</label>
             <p>Rodolfo Gomez</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Cédula</label>
             <p>001-1234567-8</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Licencia</label>
             <p>LIC-678956</p>
           </div>
         </div>
         {/* Vehículo 1 */}
         <div className="mt-2 grid grid-cols-4 gap-3 text-sm">
           <div>
             <label className="text-xs font-medium text-gray-500">Vehículo</label>
             <p>Toyota Corolla 2024</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Placa</label>
             <p>ABC-12356</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Seguro</label>
             <p>MAPRE</p>
           </div>
           <div>
             <label className="text-xs font-medium text-gray-500">Póliza</label>
             <p>POL-985454</p>
           </div>
         </div>
       </div>

       {/* Declaraciones */}
       <div className="border-t pt-3">
         <h3 className="text-sm font-semibold mb-2">DECLARACIÓN CONDUCTOR 1</h3>
         <div className="border rounded p-2 text-sm mb-3 bg-gray-50">
           <p>Siendo las 14:30 horas, mientras transitaba por la Av. 27 de Febrero en dirección Este-Oeste, 
              al llegar a la intersección con Abraham Lincoln, el vehículo 2 impactó la parte trasera de mi 
              vehículo cuando me detuve ante la luz roja del semáforo...</p>
         </div>
         <h3 className="text-sm font-semibold mb-2">DECLARACIÓN CONDUCTOR 2 (ASUME RESPONSABILIDAD)</h3>
         <div className="border rounded p-2 text-sm bg-red-50 border-red-100">
           <p>Al momento del incidente me encontraba transitando por la Av. 27 de Febrero en dirección Este-Oeste,
              cuando repentinamente el vehículo que me antecedía realizó una frenada brusca, no pudiendo evitar
              el impacto a pesar de mantener la distancia prudente reconozco que no mantuve la distancia prudente y asumo la responsabilidad por el impacto...</p>
         </div>
       </div>

       {/* Firmas */}
       <div className="border-t pt-4 mt-auto">
         <div className="grid grid-cols-3 gap-4 text-sm">
           <div className="text-center">
             <div className="border-b border-black pb-1 mb-1">
             </div>
             <p className="font-medium">Conductor 1</p>
             <p className="text-xs text-gray-500">Juan Pérez Méndez</p>
             <p className="text-xs text-gray-500">001-1234567-8</p>
           </div>
           <div className="text-center">
             <div className="border-b border-black pb-1 mb-1">
             </div>
             <p className="font-medium">Conductor 2</p>
             <p className="text-xs text-gray-500">María Rodríguez</p>
             <p className="text-xs text-gray-500">001-8765432-1</p>
           </div>
           <div className="text-center">
             <div className="border-b border-black pb-1 mb-1">
             </div>
             <p className="font-medium">Oficial DIGESETT</p>
             <p className="text-xs text-gray-500">Rango y Placa</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};