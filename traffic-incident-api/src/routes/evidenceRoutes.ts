import express from 'express';
import { evidenceController } from '../controllers/evidenceController';
import { protect } from '../middleware/auth'; // Cambiado de auth a protect
import { upload } from '../middleware/upload';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Rutas para evidencias
router.post('/upload', 
  upload.array('files'), 
  evidenceController.uploadFiles as express.RequestHandler
);

router.get('/incident/:incidentId', 
  evidenceController.getByIncident as express.RequestHandler
);

router.put('/:id/verify', 
  evidenceController.verifyEvidence as express.RequestHandler
);

export default router;