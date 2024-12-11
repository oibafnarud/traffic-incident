// src/routes/workshopRoutes.ts
import express from 'express';
import { workshopController } from '../controllers/workshopController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { workshopValidators } from '../validations/schemas';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Rutas para workshops
router.post('/',
  validate(workshopValidators.create) as express.RequestHandler,
  workshopController.create as express.RequestHandler
);

router.get('/',
  workshopController.getAll as express.RequestHandler
);

router.get('/:id',
  workshopController.getOne as express.RequestHandler
);

router.put('/:id',
  validate(workshopValidators.update) as express.RequestHandler,
  workshopController.update as express.RequestHandler
);

router.patch('/:id/toggle-status',
  workshopController.toggleStatus as express.RequestHandler
);

export default router;