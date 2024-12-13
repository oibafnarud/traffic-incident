// src/routes/workshopRoutes.ts
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { workshopController } from '../controllers/workshopController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { workshopValidators } from '../validations/schemas';
import { Workshop } from '../models/Workshop';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Handler para obtener todos los talleres
const getAllWorkshops: RequestHandler = async (req, res) => {
  try {
    console.log('Token recibido:', req.headers['authorization']);
    
    const workshops = await Workshop.find().sort('-createdAt');
    
    return res.status(200).json({
      status: 'success',
      data: workshops
    });
  } catch (error) {
    console.error('Error en GET /workshops:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener talleres'
    });
  }
};

// Rutas para workshops
router.get('/', getAllWorkshops);

router.post('/',
  validate(workshopValidators.create) as express.RequestHandler,
  workshopController.create as express.RequestHandler
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