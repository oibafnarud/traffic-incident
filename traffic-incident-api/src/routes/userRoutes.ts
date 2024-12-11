import express from 'express';
import { userController } from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { documentUpload } from '../middleware/documentUpload';
import { userValidators } from '../validations/schemas';

const router = express.Router();

// Rutas públicas
router.post('/register', 
  documentUpload.none() as express.RequestHandler,
  userController.register as express.RequestHandler
);

router.post('/login',
  userController.login as express.RequestHandler
);

// Rutas protegidas
router.use(protect as express.RequestHandler);

router.get('/me', 
  userController.getProfile as express.RequestHandler
);

router.put('/me', 
  userController.updateProfile as express.RequestHandler
);

router.put('/me/change-password',
  userController.changePassword as express.RequestHandler
);

// Rutas admin (protegidas + rol admin)
router.use(authorize('admin') as express.RequestHandler);

router.get('/', 
  userController.getUsers as express.RequestHandler
);

router.get('/:id', 
  userController.getUser as express.RequestHandler
);

router.put('/:id',
  userController.updateUser as express.RequestHandler
);

router.delete('/:id',
  userController.deleteUser as express.RequestHandler
);

export default router;