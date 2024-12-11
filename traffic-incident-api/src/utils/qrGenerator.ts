import QRCode from 'qrcode';
import { AppError } from '../types/error';

export async function generateQRCode(data: string): Promise<Buffer> {
  try {
    return await QRCode.toBuffer(data, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 200,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (error) {
    throw new AppError(500, 'Error generando código QR');
  }
}