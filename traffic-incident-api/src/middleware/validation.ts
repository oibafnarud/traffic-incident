import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { AppError } from '../types/error';

export const validateRequest = (validations: ValidationChain[]) => {
 return async (req: Request, res: Response, next: NextFunction) => {
   await Promise.all(validations.map(validation => validation.run(req)));

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return next(new AppError(400, 'Error de validación', errors.array()));
   }

   next();
 };
};