import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Incident } from '../models/Incident';
import { AppError } from '../types/error';

interface AuthRequest extends Request {
  user: {
    userId: string;
    role?: string;
  };
}

export const digesettController = {
  getIncidents: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incidents = await Incident.find()
      .populate('reportedBy', 'name email')
      .populate('involvedParties.userId', 'name email')
      .sort('-createdAt');

    res.json({
      status: 'success',
      data: { incidents }
    });
  }),

  getIncidentDetail: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incident = await Incident.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('involvedParties.userId', 'name email')
      .populate({
        path: 'vehicles',
        populate: {
          path: 'insurance.company',
          select: 'name'
        }
      });

    if (!incident) {
      throw new AppError(404, 'Incidente no encontrado');
    }

    res.json({
      status: 'success',
      data: { incident }
    });
  }),

  generateReport: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      throw new AppError(404, 'Incidente no encontrado');
    }

    // Generar reporte oficial
    const report = {
      ...req.body,
      officerId: req.user.userId,
      generatedAt: new Date(),
      status: 'pending_signature'
    };

    incident.officialReport = report;
    await incident.save();

    res.json({
      status: 'success',
      data: { incident }
    });
  }),

  signReport: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      throw new AppError(404, 'Incidente no encontrado');
    }

    if (!incident.officialReport) {
      throw new AppError(400, 'No hay reporte para firmar');
    }

    incident.officialReport.signed = true;
    incident.officialReport.signedAt = new Date();
    incident.officialReport.status = 'completed';
    
    await incident.save();

    res.json({
      status: 'success',
      data: { incident }
    });
  })
};