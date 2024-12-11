import express from 'express';
import { incidentController } from '../controllers/incidentController';
import { protect } from '../middleware/auth'; // Cambiado de auth a protect
import { validate } from '../middleware/validate';
import { incidentValidators } from '../validations/schemas'; // Cambiado de incidentSchema
import { upload } from '../middleware/upload';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Rutas para incidentes
router.post('/',
  upload.array('photos'), // Para manejar múltiples fotos
  validate(incidentValidators.create) as express.RequestHandler,
  incidentController.createIncident as express.RequestHandler
);

router.get('/',
  incidentController.getIncidents as express.RequestHandler
);

router.get('/:id',
  incidentController.getIncident as express.RequestHandler
);

router.put('/:id',
  validate(incidentValidators.update) as express.RequestHandler,
  incidentController.updateIncident as express.RequestHandler
);

export default router;