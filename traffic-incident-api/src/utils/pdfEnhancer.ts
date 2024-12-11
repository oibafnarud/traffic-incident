import PDFDocument from 'pdfkit';
import fs from 'fs';
import { AppError } from '../types/error';

export async function addQRToPDF(pdfPath: string, qrBuffer: Buffer): Promise<void> {
  try {
    const tempPath = `${pdfPath}.temp`;
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(tempPath);

    // Leer PDF original
    const originalPDF = fs.readFileSync(pdfPath);
    
    // Crear nuevo PDF con QR
    doc.pipe(writeStream);
    
    // Agregar contenido original
    doc.info = {
      ...doc.info,
      CreationDate: new Date()
    };
    
    // Agregar QR en la esquina superior derecha
    doc.image(qrBuffer, doc.page.width - 100, 50, {
      width: 80,
      height: 80
    });
    
    // Agregar texto de verificación
    doc.fontSize(8)
       .text('Verifique este documento en:', doc.page.width - 150, 135, { width: 130, align: 'center' })
       .fontSize(7)
       .text(process.env.VERIFICATION_URL || 'https://digesett.gob.do/verify', {
         width: 130,
         align: 'center'
       });

    doc.end();

    // Esperar a que se complete la escritura
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Reemplazar archivo original
    fs.renameSync(tempPath, pdfPath);
  } catch (error) {
    throw new AppError(500, 'Error agregando QR al PDF');
  }
}