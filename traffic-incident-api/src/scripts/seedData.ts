// scripts/seedData.ts
import { User, Vehicle, InsuranceCompany } from '../models';

const seedData = async () => {
 // Crear aseguradora
 const insurance = await InsuranceCompany.create({
   name: 'Seguros Universal',
   code: 'UNIV',
   status: 'active',
   address: 'Santo Domingo',
   phone: '809-555-1234',
   email: 'universal@example.com'
 });

 // Crear agente de seguros
 const agent = await User.create({
   name: 'Juan Agente',
   email: 'agente@universal.com',
   password: 'password123',
   role: 'insurance_agent',
   insuranceCompanyId: insurance.id,
   status: 'active'
 });

 // Crear cliente
 const client = await User.create({
   name: 'Pedro Cliente',
   email: 'cliente@mail.com', 
   password: 'password123',
   role: 'client',
   status: 'active',
   cedula: '001-1234567-8'
 });

 // Crear vehículo
 const vehicle = await Vehicle.create({
   userId: client.id,
   brand: 'Toyota',
   model: 'Corolla',
   year: '2022',
   plate: 'ABC-123',
   chasis: '1HGCM82633A123456',
   color: 'Gris',
   insurance: {
     company: insurance.id,
     policyNumber: 'POL-123456',
     expiresAt: new Date('2024-12-31')
   }
 });

 console.log('Datos de prueba creados');
};