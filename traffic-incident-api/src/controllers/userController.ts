import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { User } from '../models/User';
import { AppError } from '../types/error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user: {
    userId: string;
    role?: string;
  };
}

export const userController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { name, cedula, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { cedula }] });
    if (existingUser) {
      throw new AppError(400, 'Usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      cedula,
      email,
      password: hashedPassword,
      phone
    });

    await user.save();
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      status: 'success',
      data: { token, user: { id: user._id, name, email } }
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError(401, 'Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(401, 'Credenciales inválidas');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },  // Incluir el rol en el token
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role  // Incluir el rol en la respuesta
        }
      }
    });
  }),

  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    res.json({
      status: 'success',
      data: { user }
    });
  }),

  updateProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    res.json({
      status: 'success',
      data: { user }
    });
  }),

  changePassword: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId).select('+password');
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError(401, 'Contraseña actual incorrecta');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      status: 'success',
      message: 'Contraseña actualizada exitosamente'
    });
  }),

  // Agregar coma aquí
  getUsers: asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({
      status: 'success',
      data: { users }
    });
  }),

  getUser: asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }
    res.json({
      status: 'success',
      data: { user }
    });
  }),

  updateUser: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, role, phone, status } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (phone) updateData.phone = phone;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    res.json({
      status: 'success',
      data: { user }
    });
  }),

  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );

    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }

    res.json({
      status: 'success',
      message: 'Usuario desactivado exitosamente'
    });
  })
};