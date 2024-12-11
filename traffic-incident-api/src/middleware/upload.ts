import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, 'uploads/');
 },
 filename: (req, file, cb) => {
   cb(null, `${Date.now()}-${file.originalname}`);
 }
});

export const upload = multer({
 storage,
 limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
 fileFilter: (req, file, cb) => {
   const ext = path.extname(file.originalname);
   if (!['.jpg', '.jpeg', '.png', '.pdf'].includes(ext)) {
     return cb(new Error('Tipo de archivo no soportado'));
   }
   cb(null, true);
 }
});