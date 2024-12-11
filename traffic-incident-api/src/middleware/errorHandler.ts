import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
    return;
  }

  // Errores de MongoDB
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'error',
      message: 'Error de validación',
      details: err.message
    });
    return;
  }

  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    res.status(400).json({
      status: 'error',
      message: 'Registro duplicado'
    });
    return;
  }

  // Error por defecto
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
  return;
};