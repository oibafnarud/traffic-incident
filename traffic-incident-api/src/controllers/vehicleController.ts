import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Vehicle } from '../models/Vehicle';
import { AppError } from '../types/error';

interface AuthRequest extends Request {
  user: {
    userId: string;
    role?: string;
  };
}

export const vehicleController = {
  createVehicle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      brand,
      model,
      year,
      plate,
      chasis,
      color,
      insurance,
      documents
    } = req.body;

    const vehicle = new Vehicle({
      userId: req.user.userId,
      brand,
      model,
      year,
      plate,
      chasis,
      color,
      insurance: {
        company: insurance.company,
        policyNumber: insurance.policyNumber,
        expiryDate: insurance.expiryDate
      },
      documents: {
        registration: {
          fileUrl: documents?.registration?.fileUrl,
          expiryDate: documents?.registration?.expiryDate,
          verified: false
        }
      },
      status: 'active'
    });
    
    await vehicle.save();

    res.status(201).json({
      status: 'success',
      data: { vehicle }
    });
  }),

  getVehicles: asyncHandler(async (req: AuthRequest, res: Response) => {
    const vehicles = await Vehicle.find({ userId: req.user.userId })
      .populate('insurance.company', 'name')
      .sort('-createdAt');
    
    res.json({
      status: 'success',
      data: { vehicles }
    });
  }),

  getVehicle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id,
      userId: req.user.userId
    }).populate('insurance.company', 'name');

    if (!vehicle) {
      throw new AppError(404, 'Vehículo no encontrado');
    }

    res.json({
      status: 'success',
      data: { vehicle }
    });
  }),

  updateVehicle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      brand,
      model,
      year,
      plate,
      chasis,
      color,
      insurance,
      documents,
      status
    } = req.body;

    const updateData: any = {};

    if (brand) updateData.brand = brand;
    if (model) updateData.model = model;
    if (year) updateData.year = year;
    if (plate) updateData.plate = plate;
    if (chasis) updateData.chasis = chasis;
    if (color) updateData.color = color;
    if (status) updateData.status = status;

    if (insurance) {
      updateData.insurance = {
        ...(insurance.company && { company: insurance.company }),
        ...(insurance.policyNumber && { policyNumber: insurance.policyNumber }),
        ...(insurance.expiryDate && { expiryDate: insurance.expiryDate })
      };
    }

    if (documents?.registration) {
      updateData['documents.registration'] = {
        ...(documents.registration.fileUrl && { fileUrl: documents.registration.fileUrl }),
        ...(documents.registration.expiryDate && { expiryDate: documents.registration.expiryDate }),
        verified: false // Reset verification on document update
      };
    }

    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updateData,
      { new: true, runValidators: true }
    ).populate('insurance.company', 'name');

    if (!vehicle) {
      throw new AppError(404, 'Vehículo no encontrado');
    }

    res.json({
      status: 'success',
      data: { vehicle }
    });
  }),

  deleteVehicle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'inactive' },
      { new: true }
    );

    if (!vehicle) {
      throw new AppError(404, 'Vehículo no encontrado');
    }

    res.json({
      status: 'success',
      message: 'Vehículo desactivado exitosamente'
    });
  })
};