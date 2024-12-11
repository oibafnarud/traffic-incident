import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Evidence } from '../models/Evidence';
import { AppError } from '../types/error';

interface AuthRequest extends Request {
  user: {
    userId: string;
    role?: string;
  };
}

export const evidenceController = {
  uploadFiles: asyncHandler(async (req: AuthRequest, res: Response) => {
    const files = (req.files as Express.Multer.File[]) || [];
    const { incidentId } = req.body;

    if (!files.length) {
      throw new AppError(400, 'No se proporcionaron archivos');
    }

    const evidences = await Promise.all(
      files.map(async (file) => {
        const evidence = new Evidence({
          incidentId,
          fileUrl: file.path,
          fileType: file.mimetype,
          uploadedBy: req.user.userId,
          verified: false
        });
        return evidence.save();
      })
    );

    res.status(201).json({
      status: 'success',
      data: { evidences }
    });
  }),

  getByIncident: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { incidentId } = req.params;

    const evidences = await Evidence.find({ incidentId })
      .populate('uploadedBy', 'name email')
      .sort('-createdAt');

    res.json({
      status: 'success',
      data: { evidences }
    });
  }),

  verifyEvidence: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    // Solo usuarios con rol DIGESETT pueden verificar evidencias
    if (req.user.role !== 'digesett') {
      throw new AppError(403, 'No tienes permiso para verificar evidencias');
    }

    const evidence = await Evidence.findByIdAndUpdate(
      id,
      {
        verified: true,
        verifiedBy: req.user.userId,
        verifiedAt: new Date()
      },
      { new: true }
    ).populate('uploadedBy verifiedBy', 'name email');

    if (!evidence) {
      throw new AppError(404, 'Evidencia no encontrada');
    }

    res.json({
      status: 'success',
      data: { evidence }
    });
  })
};