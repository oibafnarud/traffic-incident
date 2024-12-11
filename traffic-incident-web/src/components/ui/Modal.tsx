// src/components/ui/Modal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 z-50 overflow-y-auto">
     <div className="flex min-h-screen items-center justify-center p-4">
       <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
       <div className="relative bg-white rounded-lg w-full max-w-3xl">
         <button 
           onClick={onClose}
           className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
         >
           <X size={20} />
         </button>
         <div className="p-6">
           {children}
         </div>
       </div>
     </div>
   </div>
 );
};
