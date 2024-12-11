// routes/insuranceLetterRoutes.ts
import { validateCoverageLetter } from '../validations/insuranceLetter';
import { validateRequest } from '../middleware/validation';

router.put(
  '/approve/:id', 
  auth, 
  isInsuranceAgent,
  validateCoverageLetter,
  validateRequest, 
  insuranceLetterController.approveRequest
);