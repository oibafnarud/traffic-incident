import path from 'path';
import fs from 'fs';

export const getFileUrl = (filename: string, incidentId: string): string => {
  return `/uploads/${incidentId}/${filename}`;
};

export const deleteFile = async (filePath: string): Promise<void> => {
  const fullPath = path.join(__dirname, '../../', filePath);
  if (fs.existsSync(fullPath)) {
    await fs.promises.unlink(fullPath);
  }
};