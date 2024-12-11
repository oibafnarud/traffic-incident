import { useState, useRef, useCallback } from 'react';
import { Camera, X, RotateCcw, Check } from 'lucide-react';
import Webcam from 'react-webcam';

interface CameraModalProps {
 isOpen: boolean;
 onClose: () => void;
 onCapture: (photoData: string) => void;
 title: string;
}

export const CameraModal = ({ isOpen, onClose, onCapture, title }: CameraModalProps) => {
 const [photo, setPhoto] = useState<string | null>(null);
 const webcamRef = useRef<Webcam | null>(null);
 const [isFrontCamera, setIsFrontCamera] = useState(false);

 const capture = useCallback(() => {
   const imageSrc = webcamRef.current?.getScreenshot();
   if (imageSrc) {
     setPhoto(imageSrc);
   }
 }, [webcamRef]);

 const retake = () => {
   setPhoto(null);
 };

 const confirm = () => {
   if (photo) {
     onCapture(photo);
     onClose();
   }
 };

 const toggleCamera = () => {
   setIsFrontCamera(!isFrontCamera);
 };

 if (!isOpen) return null;

 const videoConstraints = {
   width: 1280,
   height: 720,
   facingMode: isFrontCamera ? "user" : "environment"
 };

 return (
   <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
     <div className="bg-white rounded-lg w-full max-w-lg mx-4">
       {/* Header */}
       <div className="flex justify-between items-center p-4 border-b">
         <h3 className="text-lg font-medium">{title}</h3>
         <button 
           onClick={onClose}
           className="text-gray-400 hover:text-gray-500"
         >
           <X className="w-6 h-6" />
         </button>
       </div>

       {/* Camera View/Preview */}
       <div className="relative aspect-[4/3] bg-black">
         {!photo ? (
           <>
             <Webcam
               audio={false}
               ref={webcamRef}
               screenshotFormat="image/jpeg"
               videoConstraints={videoConstraints}
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-4 left-4">
               <button
                 onClick={toggleCamera}
                 className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
               >
                 <Camera className="w-6 h-6 text-white" />
               </button>
             </div>
           </>
         ) : (
           <img 
             src={photo} 
             alt="Captured" 
             className="w-full h-full object-cover"
           />
         )}
       </div>

       {/* Controls */}
       <div className="p-4 flex justify-center items-center gap-4">
         {!photo ? (
           <button
             onClick={capture}
             className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-white"
           >
             <div className="w-12 h-12 bg-red-500 rounded-full" />
           </button>
         ) : (
           <>
             <button
               onClick={retake}
               className="flex items-center gap-2 px-4 py-2 border rounded-lg"
             >
               <RotateCcw className="w-5 h-5" />
               Volver a tomar
             </button>
             <button
               onClick={confirm}
               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
             >
               <Check className="w-5 h-5" />
               Confirmar
             </button>
           </>
         )}
       </div>

       {/* Guidelines */}
       <div className="p-4 bg-gray-50 rounded-b-lg">
         <h4 className="font-medium text-sm mb-2">Consejos para una buena foto:</h4>
         <ul className="text-sm text-gray-600 space-y-1">
           <li>• Asegúrate de tener buena iluminación</li>
           <li>• Mantén el documento dentro del marco</li>
           <li>• Evita sombras o reflejos</li>
           <li>• Mantén la cámara estable</li>
         </ul>
       </div>
     </div>
   </div>
 );
};