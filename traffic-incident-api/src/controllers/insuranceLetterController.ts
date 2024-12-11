import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { InsuranceLetter } from '../models/InsuranceLetter';
import { Incident } from '../models/Incident';
import { AppError } from '../types/error';
import { generateCoverageLetter } from '../utils/pdfGenerator';
import { digitalSignature } from '../utils/digitalSignature';

export const insuranceLetterController = {
 getRequests: asyncHandler(async (req: Request, res: Response) => {
   const { status, searchTerm } = req.query;
   const { insuranceCompanyId } = req.user;

   const query = {
     insuranceCompanyId,
     ...(status && { status }),
     ...(searchTerm && {
       $or: [
         { 'client.name': { $regex: searchTerm, $options: 'i' }},
         { policyNumber: { $regex: searchTerm, $options: 'i' }}
       ]
     })
   };

   const requests = await InsuranceLetter.find(query)
     .populate('incidentId')
     .populate('clientId')
     .populate('vehicleId')
     .sort('-createdAt');

   res.json({ requests });
 }),

 createRequest: asyncHandler(async (req: Request, res: Response) => {
   const { incidentId, policyNumber } = req.body;

   const incident = await Incident.findById(incidentId);
   if (!incident?.digesettReport?.signedAt) {
     throw new AppError(400, 'No existe acta firmada para este incidente');
   }

   const request = await InsuranceLetter.create({
     incidentId,
     clientId: req.user.id,
     policyNumber,
     status: 'pending',
     insuranceCompanyId: req.user.insuranceCompanyId
   });

   res.status(201).json({ request });
 }),

 approveRequest: asyncHandler(async (req: Request, res: Response) => {
   const { id } = req.params;
   const { coverageDetails, signature } = req.body;

   const letter = await InsuranceLetter.findById(id);
   if (!letter) throw new AppError(404, 'Solicitud no encontrada');
   
   if (letter.status !== 'pending') {
     throw new AppError(400, 'Esta solicitud ya fue procesada');
   }

   const signatureValid = await digitalSignature.verify(signature);
   if (!signatureValid) throw new AppError(400, 'Firma inválida');

   letter.coverageDetails = coverageDetails;
   letter.status = 'approved';
   letter.signature = signature;
   letter.fileUrl = await generateCoverageLetter(letter);
   await letter.save();

   res.json({ letter });
 }),

 rejectRequest: asyncHandler(async (req: Request, res: Response) => {
   const { id } = req.params;
   const { reason } = req.body;

   if (!reason) throw new AppError(400, 'Debe indicar motivo del rechazo');

   const letter = await InsuranceLetter.findByIdAndUpdate(
     id,
     { 
       status: 'rejected',
       rejectionReason: reason
     },
     { new: true }
   );

   if (!letter) throw new AppError(404, 'Solicitud no encontrada');

   res.json({ letter });
 }),

 getStats: asyncHandler(async (req: Request, res: Response) => {
   const { insuranceCompanyId } = req.user;
   
   const stats = await InsuranceLetter.aggregate([
     { $match: { insuranceCompanyId } },
     { $group: {
       _id: '$status',
       count: { $sum: 1 },
       averageAmount: { $avg: '$coverageDetails.amount' }
     }}
   ]);

   res.json({ stats });
 })
};