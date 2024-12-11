// utils/digitalSignature.ts
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const digitalSignature = {
 sign(data: any, privateKey: string): string {
   const signer = crypto.createSign('RSA-SHA256');
   signer.update(JSON.stringify(data));
   return signer.sign(privateKey, 'base64');
 },

 verify(data: any, signature: string, publicKey: string): boolean {
   const verifier = crypto.createVerify('RSA-SHA256');
   verifier.update(JSON.stringify(data));
   return verifier.verify(publicKey, signature, 'base64');
 },

 generateKeyPair() {
   return crypto.generateKeyPairSync('rsa', {
     modulusLength: 2048,
     publicKeyEncoding: { type: 'spki', format: 'pem' },
     privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
   });
 }
};