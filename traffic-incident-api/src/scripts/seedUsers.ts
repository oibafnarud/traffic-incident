// traffic-incident-api/scripts/seedUsers.ts
import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { InsuranceCompany } from '../src/models/InsuranceCompany';

const seedUsers = async () => {
 try {
   await mongoose.connect('mongodb://localhost:27017/traffic_incident');

   // Crear aseguradoras
   const universal = await InsuranceCompany.create({
     name: 'Seguros Universal',
     code: 'UNIV',
     status: 'active'
   });

   const mapfre = await InsuranceCompany.create({
     name: 'Mapfre BHD',
     code: 'MAPF',
     status: 'active'
   });

   // Admin
   await User.create({
     name: 'Admin Sistema',
     email: 'admin@system.com',
     password: '12345678',
     role: 'admin',
     cedula: '001-0000001-1',
     phone: '809-555-0001',
     status: 'active'
   });

   // Oficiales DIGESETT
   await User.create({
     name: 'Juan Digesett',
     email: 'jdigesett@digesett.gob.do',
     password: '12345678',
     role: 'digesett',
     cedula: '001-0000002-1',
     phone: '809-555-0002',
     digesettBadge: 'DGT-001',
     status: 'active'
   });

   // Agentes de Seguros
   await User.create({
     name: 'María Seguros',
     email: 'maria@universal.com',
     password: '12345678',
     role: 'insurance_agent',
     cedula: '001-0000003-1',
     phone: '809-555-0003',
     insuranceCompanyId: universal._id,
     status: 'active'
   });

   await User.create({
     name: 'Pedro Seguros',
     email: 'pedro@mapfre.com',
     password: '12345678',
     role: 'insurance_agent',
     cedula: '001-0000004-1',
     phone: '809-555-0004',
     insuranceCompanyId: mapfre._id,
     status: 'active'
   });

   // Clientes
   await User.create({
     name: 'Luis Cliente',
     email: 'luis@mail.com',
     password: '12345678',
     role: 'client',
     cedula: '001-0000005-1',
     phone: '809-555-0005',
     documents: {
       cedula: {
         front: '/docs/cedula-front.jpg',
         back: '/docs/cedula-back.jpg',
         verified: true
       },
       license: {
         fileUrl: '/docs/license.jpg',
         number: 'LIC-12345',
         expiryDate: new Date('2025-12-31'),
         verified: true
       }
     },
     status: 'active'
   });

   await User.create({
     name: 'Ana Cliente',
     email: 'ana@mail.com',
     password: '12345678',
     role: 'client',
     cedula: '001-0000006-1',
     phone: '809-555-0006',
     documents: {
       cedula: {
         front: '/docs/cedula-front2.jpg',
         back: '/docs/cedula-back2.jpg',
         verified: true
       },
       license: {
         fileUrl: '/docs/license2.jpg',
         number: 'LIC-67890',
         expiryDate: new Date('2025-12-31'),
         verified: true
       }
     },
     status: 'active'
   });

   console.log('Usuarios de prueba creados exitosamente');

 } catch (error) {
   console.error('Error creando usuarios:', error);
 } finally {
   await mongoose.disconnect();
 }
};

seedUsers();