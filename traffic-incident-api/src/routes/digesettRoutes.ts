import express from 'express';
import { digesettController } from '../controllers/digesettController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Proteger todas las rutas y requerir rol DIGESETT
router.use(protect as express.RequestHandler);
router.use(authorize('digesett') as express.RequestHandler);

// Rutas DIGESETT
router.get('/incidents', 
  digesettController.getIncidents as express.RequestHandler
);

router.get('/incidents/:id', 
  digesettController.getIncidentDetail as express.RequestHandler
);

router.post('/incidents/:id/report', 
  digesettController.generateReport as express.RequestHandler
);

router.put('/incidents/:id/sign', 
  digesettController.signReport as express.RequestHandler
);

export default router;