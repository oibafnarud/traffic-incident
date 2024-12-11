import { RegistrationService } from '../services/registrationService';
import { userValidators } from '../validators/userValidators';

export const registrationController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    // Validar datos
    const validatedData = userValidators.registration.parse(req.body);
    
    const registrationService = new RegistrationService();
    const user = await registrationService.registerUser(validatedData, req.files);

    // Generar token
    const token = generateToken(user.id);

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          verified: user.verified
        }
      }
    });
  })
};