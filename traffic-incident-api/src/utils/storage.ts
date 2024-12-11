// traffic-incident-api/src/utils/storage.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { AppError } from '../types/error';

// Para desarrollo, usaremos almacenamiento local
const useLocalStorage = process.env.STORAGE_TYPE !== 's3';

export const uploadToStorage = async (
  file: Express.Multer.File,
  destinationPath: string
): Promise<string> => {
  if (useLocalStorage) {
    return uploadToLocal(file, destinationPath);
  }
  return uploadToS3(file, destinationPath);
};

async function uploadToLocal(
  file: Express.Multer.File,
  destinationPath: string
): Promise<string> {
  try {
    const uploadDir = path.join(__dirname, '../../uploads');
    const fullPath = path.join(uploadDir, destinationPath);
    
    // Crear directorio si no existe
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    // Guardar archivo
    await fs.promises.writeFile(fullPath, file.buffer);
    
    // Retornar ruta relativa para acceder al archivo
    return `/uploads/${destinationPath}`;
  } catch (error) {
    console.error('Error saving file locally:', error);
    throw new AppError(500, 'Error al guardar el archivo');
  }
}

async function uploadToS3(
  file: Express.Multer.File,
  destinationPath: string
): Promise<string> {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: destinationPath,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${destinationPath}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new AppError(500, 'Error al subir el archivo a S3');
  }
}