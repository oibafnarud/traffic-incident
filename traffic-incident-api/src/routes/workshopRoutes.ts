// src/routes/workshopRoutes.ts
import express from 'express';
import { workshopController } from '../controllers/workshopController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { workshopValidators } from '../validations/schemas';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Rutas públicas (accesibles para cualquier usuario autenticado)
router.get('/',
  workshopController.getAll as express.RequestHandler
);

router.get('/:id',
  workshopController.getOne as express.RequestHandler
);

// Rutas protegidas para administradores
router.post('/',
  authorize('admin'),
  validate(workshopValidators.create) as express.RequestHandler,
  workshopController.create as express.RequestHandler
);

router.put('/:id',
  authorize('admin'),
  validate(workshopValidators.update) as express.RequestHandler,
  workshopController.update as express.RequestHandler
);

router.patch('/:id/toggle-status',
  authorize('admin'),
  workshopController.toggleStatus as express.RequestHandler
);

export default router;