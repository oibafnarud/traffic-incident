import { KeyManager } from '../utils/keyManager';
import { SignatureManager } from '../utils/digitalSignature';
import { DocumentSigningService } from '../services/documentSigningService';
import { ActaPDFGenerator } from '../utils/pdfGenerator';
import { AppError } from '../types/error';

export class ActaService {
  private keyManager: KeyManager;
  private signatureManager: SignatureManager;
  private signingService: DocumentSigningService;

  constructor(
    keyManager: KeyManager,
    signatureManager: SignatureManager,
    signingService: DocumentSigningService
  ) {
    this.keyManager = keyManager;
    this.signatureManager = signatureManager;
    this.signingService = signingService;
  }

  async generateSignedActa(incident: any, officerId: string): Promise<{
    pdfPath: string;
    signature: DigitalSignature;
  }> {
    // Generar PDF
    const pdfGenerator = new ActaPDFGenerator(incident);
    const pdfPath = await pdfGenerator.generate();

    // Obtener clave privada del oficial
    const privateKey = await this.keyManager.getPrivateKey(officerId);

    // Firmar documento
    const signature = await this.signingService.signActa(
      incident._id,
      officerId,
      privateKey
    );

    return { pdfPath, signature };
  }
}