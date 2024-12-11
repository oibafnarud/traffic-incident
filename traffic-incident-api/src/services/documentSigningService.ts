import { SignatureManager } from '../utils/digitalSignature';
import { getPrivateKey, getPublicKey } from '../utils/keyManager';

export class DocumentSigningService {
  private signatureManager: SignatureManager;

  constructor() {
    this.signatureManager = SignatureManager.getInstance();
  }

  async signActa(actaId: string, officerId: string): Promise<DigitalSignature> {
    const documentHash = await this.generateDocumentHash(actaId);
    const privateKey = await getPrivateKey(officerId);
    
    const signature = await this.signatureManager.signDocument(documentHash, privateKey);
    
    return {
      documentId: actaId,
      officerId,
      signature,
      timestamp: new Date(),
      documentHash
    };
  }

  private async generateDocumentHash(actaId: string): Promise<string> {
    const hash = crypto.createHash('SHA256');
    // Agregar todos los campos relevantes del acta al hash
    hash.update(actaId + Date.now());
    return hash.digest('hex');
  }
}
