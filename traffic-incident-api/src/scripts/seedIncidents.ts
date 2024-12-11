// traffic-incident-api/scripts/seedIncidents.ts
import mongoose from 'mongoose';
import { Incident } from '../src/models/Incident';
import { User } from '../src/models/User';
import { Vehicle } from '../src/models/Vehicle';

const seedIncidents = async () => {
 try {
   await mongoose.connect('mongodb://localhost:27017/traffic_incident');

   const luis = await User.findOne({ email: 'luis@mail.com' });
   if (!luis) throw new Error('Usuario Luis no encontrado');

   const ana = await User.findOne({ email: 'ana@mail.com' });
   if (!ana) throw new Error('Usuario Ana no encontrado');

   const officer = await User.findOne({ role: 'digesett' });
   if (!officer) throw new Error('Oficial DIGESETT no encontrado');

   const luisVehicle = await Vehicle.findOne({ userId: luis._id });
   if (!luisVehicle) throw new Error('Vehículo de Luis no encontrado');
   if (!luisVehicle.insurance?.company) throw new Error('Información de seguro no encontrada para vehículo de Luis');

   const anaVehicle = await Vehicle.findOne({ userId: ana._id });
   if (!anaVehicle) throw new Error('Vehículo de Ana no encontrado');
   if (!anaVehicle.insurance?.company) throw new Error('Información de seguro no encontrada para vehículo de Ana');

   await Incident.create({
     participants: [
       {
         user: luis._id,
         vehicle: luisVehicle._id,
         role: 'reporter',
         isResponsible: false,
         description: 'Me encontraba detenido en el semáforo cuando fui impactado por detrás',
         documents: {
           cedula: {
             fileUrl: '/docs/cedula-luis.jpg',
             verified: true
           },
           license: {
             fileUrl: '/docs/license-luis.jpg',
             expiryDate: new Date('2024-12-31'),
             verified: true
           },
           registration: {
             fileUrl: '/docs/registration-luis.jpg',
             verified: true
           }
         }
       },
       {
         user: ana._id,
         vehicle: anaVehicle._id,
         role: 'involved',
         isResponsible: true,
         description: 'No pude frenar a tiempo y colisioné con el vehículo de adelante',
         documents: {
           cedula: {
             fileUrl: '/docs/cedula-ana.jpg',
             verified: true
           },
           license: {
             fileUrl: '/docs/license-ana.jpg',
             expiryDate: new Date('2024-12-31'),
             verified: true
           },
           registration: {
             fileUrl: '/docs/registration-ana.jpg',
             verified: true
           }
         }
       }
     ],
     location: {
       coordinates: [18.4861, -69.9312],
       address: 'Av. 27 de Febrero esq. Abraham Lincoln, Santo Domingo'
     },
     photos: [
       '/incidents/photos/1.jpg',
       '/incidents/photos/2.jpg',
       '/incidents/photos/3.jpg'
     ],
     status: 'processing',
     digesettReport: {
       officerId: officer._id,
       reportNumber: 'DGT-2024-001',
       notes: 'Colisión trasera en semáforo',
       createdAt: new Date()
     },
     insurance: [
       {
         company: luisVehicle.insurance.company,
         status: 'pending'
       },
       {
         company: anaVehicle.insurance.company,
         status: 'pending'
       }
     ]
   });

   console.log('Incidentes de prueba creados exitosamente');

  } catch (error: any) { // Especificamos el tipo como 'any'
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedIncidents();