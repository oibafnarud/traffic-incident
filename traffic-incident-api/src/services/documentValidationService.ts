import { createWorker } from 'tesseract.js';
import { AppError } from '../types/error';

export class DocumentValidationService {
  private worker: Tesseract.Worker;

  constructor() {
    this.initWorker();
  }

  private async initWorker() {
    this.worker = await createWorker('spa');
  }

  async validateCedula(image: Buffer): Promise<{
    isValid: boolean;
    extractedData?: {
      cedula: string;
      name: string;
      birthDate: string;
    }
  }> {
    try {
      const { data: { text } } = await this.worker.recognize(image);
      
      // Extraer número de cédula usando regex
      const cedulaMatch = text.match(/\d{3}-\d{7}-\d{1}/);
      if (!cedulaMatch) {
        return { isValid: false };
      }

      // Extraer nombre (asumiendo formato específico)
      const nameMatch = text.match(/NOMBRES?:?\s+([A-ZÁ-ÚÑ\s]+)\s+APELLIDOS?/);
      
      return {
        isValid: true,
        extractedData: {
          cedula: cedulaMatch[0].replace(/-/g, ''),
          name: nameMatch ? nameMatch[1].trim() : '',
          birthDate: this.extractBirthDate(text)
        }
      };
    } catch (error) {
      throw new AppError(500, 'Error al procesar documento');
    }
  }

  async validateLicense(image: Buffer): Promise<{
    isValid: boolean;
    extractedData?: {
      licenseNumber: string;
      category: string;
      expiryDate: string;
    }
  }> {
    try {
      const { data: { text } } = await this.worker.recognize(image);
      
      // Extraer número de licencia
      const licenseMatch = text.match(/[A-Z]\d{8}/);
      if (!licenseMatch) {
        return { isValid: false };
      }

      return {
        isValid: true,
        extractedData: {
          licenseNumber: licenseMatch[0],
          category: this.extractCategory(text),
          expiryDate: this.extractExpiryDate(text)
        }
      };
    } catch (error) {
      throw new AppError(500, 'Error al procesar licencia');
    }
  }

  async validateInsurance(image: Buffer): Promise<{
    isValid: boolean;
    extractedData?: {
      policyNumber: string;
      company: string;
      expiryDate: string;
    }
  }> {
    try {
      const { data: { text } } = await this.worker.recognize(image);
      
      // Validar que sea un documento de seguro
      if (!text.toLowerCase().includes('póliza') && !text.toLowerCase().includes('seguro')) {
        return { isValid: false };
      }

      return {
        isValid: true,
        extractedData: {
          policyNumber: this.extractPolicyNumber(text),
          company: this.extractInsuranceCompany(text),
          expiryDate: this.extractExpiryDate(text)
        }
      };
    } catch (error) {
      throw new AppError(500, 'Error al procesar seguro');
    }
  }

  private extractBirthDate(text: string): string {
    const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);
    return dateMatch ? dateMatch[0] : '';
  }

  private extractCategory(text: string): string {
    const categoryMatch = text.match(/CATEGORÍA:?\s*([A-Z0-9]+)/i);
    return categoryMatch ? categoryMatch[1] : '';
  }

  private extractExpiryDate(text: string): string {
    const dateMatch = text.match(/VENCE:?\s*(\d{2}\/\d{2}\/\d{4})/i);
    return dateMatch ? dateMatch[1] : '';
  }

  private extractPolicyNumber(text: string): string {
    const policyMatch = text.match(/PÓLIZA:?\s*([\w-]+)/i);
    return policyMatch ? policyMatch[1] : '';
  }

  private extractInsuranceCompany(text: string): string {
    // Lista de aseguradoras conocidas
    const companies = [
      'SEGUROS PATRIA',
      'SEGUROS PEPÍN',
      'LA COLONIAL',
      'MAPFRE BHD',
      'HUMANO'
    ];

    for (const company of companies) {
      if (text.includes(company)) {
        return company;
      }
    }
    return '';
  }

  async cleanup() {
    await this.worker.terminate();
  }
}