// utils/pdfGenerator.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';

export const pdfGenerator = {
  async generateActa(incident: any) {
    const doc = new PDFDocument();
    const filename = `acta-${incident.id}.pdf`;
    const writeStream = fs.createWriteStream(`uploads/actas/${filename}`);

    doc.pipe(writeStream);

    // Header
    doc.fontSize(16).text('DIRECCIÓN GENERAL DE SEGURIDAD DE TRÁNSITO', {align: 'center'});
    doc.moveDown();
    doc.fontSize(14).text('ACTA DE TRÁNSITO', {align: 'center'});
    
    // Details
    doc.moveDown();
    doc.fontSize(12).text(`Acta No.: ${incident.digesettReport.reportNumber}`);
    doc.text(`Fecha: ${new Date(incident.createdAt).toLocaleString()}`);
    doc.text(`Ubicación: ${incident.location.address}`);

    // Participants
    incident.participants.forEach((p: any, i: number) => {
      doc.moveDown();
      doc.text(`Conductor ${i + 1}: ${p.user.name}`);
      doc.text(`Cédula: ${p.user.cedula}`);
      doc.text(`Vehículo: ${p.vehicle.brand} ${p.vehicle.model}`);
      doc.text(`Placa: ${p.vehicle.plate}`);
    });

    doc.end();
    return `/uploads/actas/${filename}`;
  },

  async generateCoverageLetter(letter: any) {
    const doc = new PDFDocument();
    const filename = `carta-${letter.id}.pdf`;
    const writeStream = fs.createWriteStream(`uploads/cartas/${filename}`);

    doc.pipe(writeStream);

    // Content
    doc.fontSize(14).text('CARTA DE COBERTURA', {align: 'center'});
    doc.moveDown();

    doc.fontSize(12).text(`No.: ${letter.letterNumber}`);
    doc.text(`Fecha: ${new Date().toLocaleString()}`);
    doc.text(`Póliza: ${letter.policyNumber}`);
    doc.text(`Cobertura: RD$ ${letter.coverageDetails.amount}`);

    doc.end();
    return `/uploads/cartas/${filename}`;
  }
};