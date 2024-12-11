import { KeyManager } from '../utils/keyManager';

export class OfficerKeyService {
  private keyManager: KeyManager;

  constructor(keyManager: KeyManager) {
    this.keyManager = keyManager;
  }

  async generateOfficerKeys(officerId: string): Promise<void> {
    await this.keyManager.generateKeyPair(officerId);
  }

  async rotateOfficerKeys(officerId: string): Promise<void> {
    await this.keyManager.generateKeyPair(officerId);
    // Aquí podríamos agregar lógica para revocar firmas anteriores si es necesario
  }
}