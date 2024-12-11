// traffic-incident-api/scripts/seedVehicles.ts
import mongoose from 'mongoose';
import { Vehicle } from '../src/models/Vehicle';
import { User } from '../src/models/User';
import { InsuranceCompany } from '../src/models/InsuranceCompany';

const seedVehicles = async () => {
 try {
   await mongoose.connect('mongodb://localhost:27017/traffic_incident');

   // Obtener IDs necesarios
   const luis = await User.findOne({ email: 'luis@mail.com' });
   if (!luis) throw new Error('Usuario Luis no encontrado');

   const ana = await User.findOne({ email: 'ana@mail.com' });
   if (!ana) throw new Error('Usuario Ana no encontrado');

   const universal = await InsuranceCompany.findOne({ code: 'UNIV' });
   if (!universal) throw new Error('Aseguradora Universal no encontrada');

   const mapfre = await InsuranceCompany.findOne({ code: 'MAPF' });
   if (!mapfre) throw new Error('Aseguradora Mapfre no encontrada');

   // Vehículos de Luis
   await Vehicle.create({
     userId: luis._id,
     brand: 'Toyota',
     model: 'Corolla',
     year: '2022',
     plate: 'ABC-123',
     chasis: '1HGCM82633A123456',
     color: 'Gris',
     insurance: {
       company: universal._id,
       policyNumber: 'POL-987654',
       expiryDate: new Date('2024-12-31')
     },
     documents: {
       registration: {
         fileUrl: '/docs/registration1.jpg',
         expiryDate: new Date('2024-12-31'),
         verified: true
       }
     }
   });

   // Vehículos de Ana
   await Vehicle.create({
     userId: ana._id,
     brand: 'Honda',
     model: 'Civic',
     year: '2021',
     plate: 'XYZ-789',
     chasis: '2HGES16575H123456',
     color: 'Blanco',
     insurance: {
       company: mapfre._id,
       policyNumber: 'POL-123456',
       expiryDate: new Date('2024-12-31')
     },
     documents: {
       registration: {
         fileUrl: '/docs/registration2.jpg',
         expiryDate: new Date('2024-12-31'),
         verified: true
       }
     }
   });

   console.log('Vehículos de prueba creados exitosamente');

 } catch (error) {
   console.error('Error creando vehículos:', error);
 } finally {
   await mongoose.disconnect();
 }
};

seedVehicles();