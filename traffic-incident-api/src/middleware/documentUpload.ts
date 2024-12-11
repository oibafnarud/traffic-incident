import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { AppError } from '../types/error';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (!extname || !mimetype) {
    return cb(new AppError(400, 'Solo se permiten archivos jpeg, jpg, png y pdf'));
  }
  cb(null, true);
};

export const documentUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5
  },
  fileFilter
});

// Configuración para diferentes tipos de documentos
export const registrationUpload = documentUpload.fields([
    { name: 'cedulaFront', maxCount: 1 },
    { name: 'cedulaBack', maxCount: 1 },
    { name: 'licensePhoto', maxCount: 1 },
    { name: 'vehiclePhoto', maxCount: 1 },
    { name: 'insuranceDoc', maxCount: 1 }
  ]);