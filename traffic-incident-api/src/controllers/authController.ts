import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../types/error';
import { asyncHandler } from '../middleware/asyncHandler';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role, cedula, phone } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError(400, 'Usuario ya existe');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      cedula,
      phone
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user }); 
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
      .select('+password')
      .populate('insuranceCompanyId');

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AppError(401, 'Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token, user });
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user.id).populate('insuranceCompanyId');
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }
    res.json({ user });
  }),

  updateProfile: asyncHandler(async (req: Request, res: Response) => {
    const { name, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true, runValidators: true }
    );

    res.json({ user });
  }),

  changePassword: asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    if (!await bcrypt.compare(currentPassword, user.password)) {
      throw new AppError(401, 'Contraseña actual incorrecta');
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada' });
  }),

  refreshToken: asyncHandler(async (req: Request, res: Response) => {
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token });
  })
};