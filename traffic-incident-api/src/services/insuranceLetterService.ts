// services/insuranceLetterService.ts
import { CoverageLetter } from '../types/insuranceLetter';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { signDocument } from './documentSigningService';

export const insuranceLetterService = {
 async generateLetter(data: CoverageLetter) {
   const pdfDoc = await PDFDocument.create();
   const page = pdfDoc.addPage();
   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

   page.drawText('CARTA DE COBERTURA', {
     x: 50,
     y: 750,
     size: 20,
     font
   });

   // Datos del asegurado
   page.drawText(`Asegurado: ${data.client.name}`, {
     x: 50,
     y: 700,
     size: 12,
     font
   });

   page.drawText(`Póliza: ${data.policyNumber}`, {
     x: 50,
     y: 680,
     size: 12,
     font  
   });

   // Detalles de cobertura
   page.drawText(`Límite de Cobertura: RD$ ${data.coverageDetails.limit}`, {
     x: 50,
     y: 640,
     size: 12,
     font
   });

   const pdfBytes = await pdfDoc.save();
   return pdfBytes;
 },

 async signLetter(letterId: string, agentId: string) {
   const signature = await signDocument({
     documentId: letterId,
     signerId: agentId,
     signatureType: 'insurance_agent',
     reason: 'Aprobación de carta de cobertura'
   });

   return signature;
 },

 async validateDocuments(documents: CoverageLetter['documents']) {
   // Validar documentos requeridos
   const requiredDocs = [
     'digesettReport',
     'driverLicense', 
     'vehicleRegistration',
     'insuranceCard'
   ];

   const missingDocs = requiredDocs.filter(doc => !documents[doc]);
   
   if(missingDocs.length > 0) {
     throw new Error(`Documentos faltantes: ${missingDocs.join(', ')}`);
   }

   // Validar que los documentos estén vigentes
   await Promise.all(
     Object.entries(documents).map(async ([key, value]) => {
       const isValid = await documentValidationService.validate(value);
       if(!isValid) {
         throw new Error(`Documento inválido o expirado: ${key}`);
       }
     })
   );
 }
};

// Actualizar controlador para usar el servicio
export const insuranceLetterController = {
 async approveRequest(req: Request, res: Response) {
   try {
     const { id } = req.params;
     const { coverageDetails } = req.body;

     const letter = await InsuranceLetter.findById(id)
       .populate('documents');

     if(!letter) {
       return res.status(404).json({message: 'Solicitud no encontrada'});
     }

     // Validar documentos
     await insuranceLetterService.validateDocuments(letter.documents);

     // Generar carta
     const pdfBuffer = await insuranceLetterService.generateLetter({
       ...letter.toObject(),
       coverageDetails
     });

     // Firmar carta
     const signature = await insuranceLetterService.signLetter(
       letter.id,
       req.user.id
     );

     // Actualizar solicitud
     letter.status = 'approved';
     letter.coverageDetails = coverageDetails;
     letter.signature = signature;
     letter.pdfUrl = await uploadPDF(pdfBuffer);
     
     await letter.save();

     res.json(letter);

   } catch (error) {
     res.status(500).json({message: error.message});
   }
 }
};