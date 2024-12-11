import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { AppError } from '../types/error';

const KEYS_DIR = path.join(__dirname, '../../keys');

export class KeyManager {
  private static instance: KeyManager;

  static async getInstance(): Promise<KeyManager> {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
      await KeyManager.instance.init();
    }
    return KeyManager.instance;
  }

  private async init() {
    await fs.mkdir(KEYS_DIR, { recursive: true });
  }

  async generateKeyPair(officerId: string): Promise<{ publicKey: string, privateKey: string }> {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    await Promise.all([
      this.saveKey(`${officerId}_public.pem`, publicKey),
      this.saveKey(`${officerId}_private.pem`, privateKey, true)
    ]);

    return { publicKey, privateKey };
  }

  async getPublicKey(officerId: string): Promise<string> {
    return this.readKey(`${officerId}_public.pem`);
  }

  async getPrivateKey(officerId: string): Promise<string> {
    return this.readKey(`${officerId}_private.pem`);
  }

  private async saveKey(filename: string, key: string, isPrivate = false) {
    const filePath = path.join(KEYS_DIR, filename);
    await fs.writeFile(filePath, key, { mode: isPrivate ? 0o600 : 0o644 });
  }

  private async readKey(filename: string): Promise<string> {
    try {
      const filePath = path.join(KEYS_DIR, filename);
      return await fs.readFile(filePath, 'utf8');
    } catch (error) {
      throw new AppError(404, 'Clave no encontrada');
    }
  }
}