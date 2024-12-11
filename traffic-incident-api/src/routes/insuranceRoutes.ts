import { Router } from 'express';
import { insuranceLetterController } from '../controllers/insuranceLetterController';
import { authInsurance } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = Router();

router.use(authInsurance);

router.get('/letters', insuranceLetterController.getRequests);
router.post('/letters', validateRequest, insuranceLetterController.createRequest);
router.put('/letters/:id/approve', insuranceLetterController.approveRequest);
router.put('/letters/:id/reject', insuranceLetterController.rejectRequest);
router.get('/stats', insuranceLetterController.getStats);

export default router;