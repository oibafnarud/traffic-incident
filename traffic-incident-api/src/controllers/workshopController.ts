// src/controllers/workshopController.ts
import { Request, Response } from 'express';
import { Workshop } from '../models/Workshop';
import { asyncHandler } from '../middleware/asyncHandler';
import { AppError } from '../types/error';

export const workshopController = {
  // Crear taller
  create: asyncHandler(async (req: Request, res: Response) => {
    const workshop = await Workshop.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: workshop
    });
  }),

  // Obtener todos los talleres
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const workshops = await Workshop.find().sort('-createdAt');
    
    res.json({
      status: 'success',
      data: workshops
    });
  }),

  // Obtener un taller específico
  getOne: asyncHandler(async (req: Request, res: Response) => {
    const workshop = await Workshop.findById(req.params.id);
    
    if (!workshop) {
      throw new AppError(404, 'Taller no encontrado');
    }

    res.json({
      status: 'success',
      data: workshop
    });
  }),

  // Actualizar taller
  update: asyncHandler(async (req: Request, res: Response) => {
    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!workshop) {
      throw new AppError(404, 'Taller no encontrado');
    }

    res.json({
      status: 'success',
      data: workshop
    });
  }),

  // Cambiar estado
  toggleStatus: asyncHandler(async (req: Request, res: Response) => {
    const workshop = await Workshop.findById(req.params.id);
    
    if (!workshop) {
      throw new AppError(404, 'Taller no encontrado');
    }

    workshop.status = workshop.status === 'active' ? 'inactive' : 'active';
    await workshop.save();

    res.json({
      status: 'success',
      data: workshop
    });
  })
};