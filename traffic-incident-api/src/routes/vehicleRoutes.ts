import express from 'express';
import { vehicleController } from '../controllers/vehicleController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { vehicleValidators } from '../validations/schemas';

const router = express.Router();

// Proteger todas las rutas
router.use(protect as express.RequestHandler);

// Rutas de vehículos
router.post('/', 
  validate(vehicleValidators.create), 
  vehicleController.createVehicle
);

router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getVehicle);

router.put('/:id', 
  validate(vehicleValidators.update), 
  vehicleController.updateVehicle
);

router.delete('/:id', vehicleController.deleteVehicle);

export default router;