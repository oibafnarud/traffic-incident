import { z } from 'zod';

export const userValidators = {
  registration: z.object({
    personalInfo: z.object({
      name: z.string().min(2, 'Nombre muy corto'),
      cedula: z.string().regex(/^\d{11}$/, 'Cédula debe tener 11 dígitos'),
      email: z.string().email('Email inválido'),
      phone: z.string().regex(/^\d{10}$/, 'Teléfono debe tener 10 dígitos'),
      password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres')
    }),
    license: z.object({
      number: z.string().min(5, 'Número de licencia inválido'),
      expiry: z.string().datetime('Fecha de expiración inválida'),
      category: z.string()
    }),
    vehicle: z.object({
      plate: z.string().regex(/^[A-Z0-9]{5,8}$/, 'Placa inválida'),
      brand: z.string().min(2, 'Marca requerida'),
      model: z.string().min(2, 'Modelo requerido'),
      year: z.number().min(1900).max(new Date().getFullYear() + 1),
      insurance: z.object({
        company: z.string().min(2, 'Aseguradora requerida'),
        policyNumber: z.string().min(5, 'Número de póliza requerido'),
        expirationDate: z.string().datetime()
      })
    }).optional()
  })
};