import { DocumentValidationService } from './documentValidationService';

export class RegistrationService {
  private documentValidator: DocumentValidationService;

  constructor() {
    this.documentValidator = new DocumentValidationService();
  }

  async registerUser(userData: any, documents: any) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Validar cédula
      const cedulaValidation = await this.documentValidator.validateCedula(
        documents.cedulaFront.buffer
      );

      if (!cedulaValidation.isValid || 
          cedulaValidation.extractedData?.cedula !== userData.personalInfo.cedula) {
        throw new AppError(400, 'Cédula no válida o no coincide con los datos proporcionados');
      }

      // Validar licencia
      const licenseValidation = await this.documentValidator.validateLicense(
        documents.licensePhoto.buffer
      );

      if (!licenseValidation.isValid || 
          licenseValidation.extractedData?.licenseNumber !== userData.license.number) {
        throw new AppError(400, 'Licencia no válida o no coincide con los datos proporcionados');
      }

      // Si hay vehículo, validar seguro
      if (userData.vehicle && documents.insuranceDoc) {
        const insuranceValidation = await this.documentValidator.validateInsurance(
          documents.insuranceDoc.buffer
        );

        if (!insuranceValidation.isValid || 
            insuranceValidation.extractedData?.policyNumber !== userData.vehicle.insurance.policyNumber) {
          throw new AppError(400, 'Documento de seguro no válido o no coincide');
        }
      }

      // Crear usuario con datos validados
      const user = new User({
        name: cedulaValidation.extractedData?.name || userData.personalInfo.name,
        cedula: cedulaValidation.extractedData?.cedula,
        email: userData.personalInfo.email,
        phone: userData.personalInfo.phone,
        license: {
          number: licenseValidation.extractedData?.licenseNumber,
          expiry: licenseValidation.extractedData?.expiryDate,
          category: licenseValidation.extractedData?.category,
          verified: true
        }
      });

      // Subir documentos y guardar usuario
      const uploadedDocs = await this.uploadDocuments(documents, user.id);
      user.documents = uploadedDocs;
      await user.save({ session });

      // Procesar vehículo si existe
      if (userData.vehicle) {
        await this.processVehicle(userData.vehicle, user.id, session);
      }

      await session.commitTransaction();
      await this.documentValidator.cleanup();
      
      return user;

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  private async processVehicle(vehicleData: any, userId: string, session: any) {
    const vehicle = new Vehicle({
      owner: userId,
      plate: vehicleData.plate,
      brand: vehicleData.brand,
      model: vehicleData.model,
      year: vehicleData.year,
      insurance: {
        ...vehicleData.insurance,
        verified: true
      }
    });

    await vehicle.save({ session });
    await User.findByIdAndUpdate(
      userId,
      { $push: { vehicles: vehicle.id } },
      { session }
    );
  }
}