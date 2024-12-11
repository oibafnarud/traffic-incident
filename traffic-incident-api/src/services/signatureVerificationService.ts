import { SignatureManager } from '../utils/digitalSignature';
import { getPublicKey } from '../utils/keyManager';
import DigesettSignature from '../models/DigesettSignature';
import { AppError } from '../types/error';

export class SignatureVerificationService {
  private signatureManager: SignatureManager;

  constructor() {
    this.signatureManager = SignatureManager.getInstance();
  }

  async verifyActa(actaId: string): Promise<{
    isValid: boolean;
    details: {
      officerId: string;
      timestamp: Date;
      status: string;
    };
  }> {
    const signature = await DigesettSignature.findOne({ documentId: actaId })
      .populate('officerId');

    if (!signature) {
      throw new AppError(404, 'Firma no encontrada');
    }

    const publicKey = await getPublicKey(signature.officerId);
    const isValid = await this.signatureManager.verifySignature(
      signature.documentHash,
      signature.signature,
      publicKey
    );

    return {
      isValid,
      details: {
        officerId: signature.officerId,
        timestamp: signature.timestamp,
        status: signature.status
      }
    };
  }
}