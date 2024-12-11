// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User';

export interface CustomRequest extends Request {
  user?: any;
}

interface JWTCustomPayload extends JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'No estás autorizado para acceder a esta ruta'
      });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JWTCustomPayload;

    // Verificar si el usuario aún existe
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'El usuario que pertenece a este token ya no existe'
      });
      return;
    }

    // Asignar usuario a la request
    (req as CustomRequest).user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'No estás autorizado para acceder a esta ruta'
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const customReq = req as CustomRequest;
    if (!customReq.user || !roles.includes(customReq.user.role)) {
      res.status(403).json({
        status: 'error',
        message: 'No tienes permiso para realizar esta acción'
      });
      return;
    }
    next();
  };
};