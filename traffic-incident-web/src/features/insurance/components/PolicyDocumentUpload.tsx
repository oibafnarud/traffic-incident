// src/features/insurance/components/PolicyDocumentUpload.tsx
import { useState, useRef } from 'react';
import { Camera, Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { CameraModal } from '@/components/ui/CameraModal';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: number; // en MB
}

interface UploadedDocument {
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface PolicyDocumentUploadProps {
  policyNumber: string;
  insuranceCompanyId: string;
  onComplete: (documents: Record<string, File>) => void;
}

export const PolicyDocumentUpload = ({
  policyNumber,
  insuranceCompanyId,
  onComplete
}: PolicyDocumentUploadProps) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, UploadedDocument>>({});
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredDocuments: Document[] = [
    {
      id: 'policy',
      name: 'Póliza de Seguro',
      description: 'Foto clara y legible de la póliza vigente',
      required: true,
      acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      maxSize: 5
    },
    {
      id: 'cedula',
      name: 'Cédula de Identidad',
      description: 'Foto de ambos lados de la cédula',
      required: true,
      acceptedFormats: ['.jpg', '.jpeg', '.png'],
      maxSize: 5
    },
    {
      id: 'license',
      name: 'Licencia de Conducir',
      description: 'Foto de la licencia vigente',
      required: true,
      acceptedFormats: ['.jpg', '.jpeg', '.png'],
      maxSize: 5
    },
    {
      id: 'matricula',
      name: 'Matrícula del Vehículo',
      description: 'Foto clara de la matrícula del vehículo',
      required: true,
      acceptedFormats: ['.jpg', '.jpeg', '.png'],
      maxSize: 5
    },
    {
      id: 'marbete',
      name: 'Marbete',
      description: 'Foto del marbete actual (si aplica)',
      required: false,
      acceptedFormats: ['.jpg', '.jpeg', '.png'],
      maxSize: 5
    }
  ];

  const handleFileSelect = async (docId: string, file: File) => {
    try {
      // Validar tipo de archivo
      const doc = requiredDocuments.find(d => d.id === docId);
      const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!doc?.acceptedFormats.includes(extension)) {
        throw new Error(`Formato no permitido. Use: ${doc?.acceptedFormats.join(', ')}`);
      }

      // Validar tamaño
      if (file.size > doc.maxSize * 1024 * 1024) {
        throw new Error(`El archivo no debe superar ${doc.maxSize}MB`);
      }

      // Crear preview
      const preview = URL.createObjectURL(file);

      setUploadedDocuments(prev => ({
        ...prev,
        [docId]: {
          file,
          preview,
          status: 'uploading'
        }
      }));

      // Simular subida al servidor
      await new Promise(resolve => setTimeout(resolve, 1500));

      setUploadedDocuments(prev => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          status: 'success'
        }
      }));
    } catch (error) {
      setUploadedDocuments(prev => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          status: 'error',
          error: error.message
        }
      }));
    }
  };

  const handleCameraCapture = async (photoData: string) => {
    if (!currentDocId) return;

    try {
      const res = await fetch(photoData);
      const blob = await res.blob();
      const file = new File([blob], `${currentDocId}_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      await handleFileSelect(currentDocId, file);
    } catch (error) {
      setUploadedDocuments(prev => ({
        ...prev,
        [currentDocId]: {
          ...prev[currentDocId],
          status: 'error',
          error: 'Error al procesar la foto'
        }
      }));
    } finally {
      setIsCameraOpen(false);
      setCurrentDocId(null);
    }
  };

  const removeDocument = (docId: string) => {
    const newDocs = { ...uploadedDocuments };
    if (newDocs[docId]?.preview) {
      URL.revokeObjectURL(newDocs[docId].preview);
    }
    delete newDocs[docId];
    setUploadedDocuments(newDocs);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Documentos Requeridos</h3>

        <div className="space-y-6">
          {requiredDocuments.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{doc.name}</h4>
                    {doc.required && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Requerido
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </div>
                {uploadedDocuments[doc.id]?.status === 'success' && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>

              {!uploadedDocuments[doc.id] ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept={doc.acceptedFormats.join(',')}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileSelect(doc.id, file);
                          }
                        }}
                      />
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Seleccionar archivo
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentDocId(doc.id);
                      setIsCameraOpen(true);
                    }}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                    title="Tomar foto"
                  >
                    <Camera className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {uploadedDocuments[doc.id].preview && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={uploadedDocuments[doc.id].preview}
                        alt={doc.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploadedDocuments[doc.id].file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {uploadedDocuments[doc.id].error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {uploadedDocuments[doc.id].error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            const files = Object.entries(uploadedDocuments).reduce((acc, [id, doc]) => {
              if (doc.status === 'success') {
                acc[id] = doc.file;
              }
              return acc;
            }, {} as Record<string, File>);
            onComplete(files);
          }}
          disabled={!Object.values(uploadedDocuments).every(doc => doc.status === 'success')}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirmar Documentos
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Información Importante</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Los documentos deben ser claros y legibles</li>
          <li>• El tamaño máximo por archivo es de 5MB</li>
          <li>• Formatos aceptados: JPG, PNG, PDF</li>
          <li>• Las fotos pueden ser tomadas directamente desde la app</li>
        </ul>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => {
          setIsCameraOpen(false);
          setCurrentDocId(null);
        }}
        onCapture={handleCameraCapture}
        title={`Foto de ${requiredDocuments.find(d => d.id === currentDocId)?.name}`}
      />
    </div>
  );
};