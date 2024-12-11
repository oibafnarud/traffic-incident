// src/controllers/incidentController.ts
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

export const incidentController = {
  createIncident: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incident = new Incident({
      ...req.body,
      reportedBy: req.user.userId,
      photos: (req.files as Express.Multer.File[])?.map(file => file.path) || []
    });

    await incident.save();

    res.status(201).json({
      status: 'success',
      data: { incident }
    });
  }),

  getIncidents: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incidents = await Incident.find({
      $or: [
        { reportedBy: req.user.userId },
        { 'involvedParties.userId': req.user.userId }
      ]
    })
    .populate('reportedBy', 'name email')
    .populate('involvedParties.userId', 'name email')
    .sort('-createdAt');

    res.json({
      status: 'success',
      data: { incidents }
    });
  }),

  getIncident: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incident = await Incident.findOne({
      _id: req.params.id,
      $or: [
        { reportedBy: req.user.userId },
        { 'involvedParties.userId': req.user.userId }
      ]
    })
    .populate('reportedBy', 'name email')
    .populate('involvedParties.userId', 'name email');

    if (!incident) {
      throw new AppError(404, 'Incidente no encontrado');
    }

    res.json({
      status: 'success',
      data: { incident }
    });
  }),

  updateIncident: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status, description, resolution, additionalNotes } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (description) updateData.description = description;
    if (resolution) updateData.resolution = resolution;
    if (additionalNotes) updateData.additionalNotes = additionalNotes;

    const incident = await Incident.findOneAndUpdate(
      {
        _id: req.params.id,
        reportedBy: req.user.userId
      },
      updateData,
      { new: true, runValidators: true }
    )
    .populate('reportedBy', 'name email')
    .populate('involvedParties.userId', 'name email');

    if (!incident) {
      throw new AppError(404, 'Incidente no encontrado');
    }

    res.json({
      status: 'success',
      data: { incident }
    });
  }),

  // Método para obtener incidentes del usuario actual
  getUserIncidents: asyncHandler(async (req: AuthRequest, res: Response) => {
    const incidents = await Incident.find({
      reportedBy: req.user.userId
    })
    .populate('reportedBy', 'name email')
    .sort('-createdAt');

    res.json({
      status: 'success',
      data: { incidents }
    });
  })
};