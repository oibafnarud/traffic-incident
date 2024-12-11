// validations/insuranceLetter.ts
import { body } from 'express-validator';

export const validateCoverageLetter = [
  body('incidentId').notEmpty(),
  body('policyNumber').notEmpty(),
  body('coverageDetails.limit').isNumeric(),
  body('coverageDetails.deductible').isNumeric(),
  body('coverageDetails.type').isIn(['comprehensive', 'liability', 'collision'])
];