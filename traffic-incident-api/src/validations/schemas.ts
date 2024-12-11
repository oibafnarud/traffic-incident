import { body } from 'express-validator';


export const userValidators = {
  registration: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('El nombre es requerido')
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    
    body('password')
      .trim()
      .notEmpty()
      .withMessage('La contraseña es requerida')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    body('cedula')
      .trim()
      .notEmpty()
      .withMessage('La cédula es requerida')
      .matches(/^\d{11}$/)
      .withMessage('Formato de cédula inválido'),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^\d{10}$/)
      .withMessage('Formato de teléfono inválido')
  ],

  login: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Email inválido'),
    
    body('password')
      .trim()
      .notEmpty()
      .withMessage('La contraseña es requerida')
  ],

  updateProfile: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^\d{10}$/)
      .withMessage('Formato de teléfono inválido')
  ],

  changePassword: [
    body('currentPassword')
      .trim()
      .notEmpty()
      .withMessage('La contraseña actual es requerida'),
    
    body('newPassword')
      .trim()
      .notEmpty()
      .withMessage('La nueva contraseña es requerida')
      .isLength({ min: 6 })
      .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
  ]
};

export const vehicleValidators = {
  create: [
    body('plate')
      .trim()
      .notEmpty()
      .withMessage('La placa es requerida'),
    
    body('brand')
      .trim()
      .notEmpty()
      .withMessage('La marca es requerida'),
    
    body('model')
      .trim()
      .notEmpty()
      .withMessage('El modelo es requerido'),
    
    body('year')
      .trim()
      .notEmpty()
      .withMessage('El año es requerido'),
    
    body('chasis')
      .trim()
      .notEmpty()
      .withMessage('El número de chasis es requerido'),
    
    body('insurance.company')
      .notEmpty()
      .withMessage('La aseguradora es requerida'),
    
    body('insurance.policyNumber')
      .trim()
      .notEmpty()
      .withMessage('El número de póliza es requerido'),
    
    body('insurance.expiryDate')
      .notEmpty()
      .withMessage('La fecha de expiración del seguro es requerida')
      .isISO8601()
      .withMessage('Formato de fecha inválido')
  ],

  update: [
    body('plate')
      .optional()
      .trim(),
    
    body('brand')
      .optional()
      .trim(),
    
    body('model')
      .optional()
      .trim(),
    
    body('year')
      .optional()
      .trim(),
    
    body('chasis')
      .optional()
      .trim(),
    
    body('color')
      .optional()
      .trim(),
    
    body('insurance.company')
      .optional(),
    
    body('insurance.policyNumber')
      .optional()
      .trim(),
    
    body('insurance.expiryDate')
      .optional()
      .isISO8601()
      .withMessage('Formato de fecha inválido')
  ]
};

export const incidentValidators = {
  create: [
    body('location')
      .isObject()
      .withMessage('La ubicación es requerida'),
    body('location.latitude')
      .isFloat()
      .withMessage('Latitud inválida'),
    body('location.longitude')
      .isFloat()
      .withMessage('Longitud inválida'),
    body('location.address')
      .optional()
      .isString()
      .trim(),
    
    body('description')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('La descripción es requerida'),
    
    body('involvedVehicles')
      .isArray()
      .withMessage('Debe incluir los vehículos involucrados'),
    
    body('involvedVehicles.*.vehicleId')
      .isMongoId()
      .withMessage('ID de vehículo inválido'),
    
    body('involvedVehicles.*.role')
      .isIn(['affected', 'responsible'])
      .withMessage('Rol de vehículo inválido'),
    
    body('severity')
      .isIn(['minor', 'moderate', 'severe'])
      .withMessage('Severidad inválida')
  ],

  update: [
    body('status')
      .optional()
      .isIn(['pending', 'processing', 'resolved', 'closed'])
      .withMessage('Estado inválido'),
    
    body('description')
      .optional()
      .isString()
      .trim(),
    
    body('resolution')
      .optional()
      .isString()
      .trim(),
    
    body('additionalNotes')
      .optional()
      .isString()
      .trim()
  ],

  updateUser: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    
    body('role')
      .optional()
      .isIn(['client', 'admin', 'digesett', 'insurance_agent'])
      .withMessage('Rol inválido'),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^\d{10}$/)
      .withMessage('Formato de teléfono inválido'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Estado inválido')
  ]

};

export const workshopValidators = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('El nombre es requerido')
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('address')
      .trim()
      .notEmpty()
      .withMessage('La dirección es requerida'),
    
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('El teléfono es requerido')
      .matches(/^\d{10}$/)
      .withMessage('Formato de teléfono inválido'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    
    body('specialties')
      .isArray()
      .withMessage('Las especialidades deben ser un array')
      .notEmpty()
      .withMessage('Debe especificar al menos una especialidad'),

    body('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Estado inválido')
  ],

  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('address')
      .optional()
      .trim(),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^\d{10}$/)
      .withMessage('Formato de teléfono inválido'),
    
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    
    body('specialties')
      .optional()
      .isArray()
      .withMessage('Las especialidades deben ser un array'),

    body('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Estado inválido')
  ]
};