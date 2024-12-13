// traffic-incident-api/src/scripts/seedWorkshops.ts
import mongoose from 'mongoose';
import { Workshop } from '../models/Workshop';

const seedWorkshops = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/traffic_incident');

    // Limpiar datos existentes
    await Workshop.deleteMany({});

    // Crear talleres
    await Workshop.create([
      {
        name: 'Taller AutoExpress',
        address: 'Av. 27 de Febrero #123, Santo Domingo',
        phone: '809-555-0101',
        email: 'autoexpress@taller.com',
        specialties: ['Mecánica General', 'Hojalatería', 'Pintura'],
        status: 'active'
      },
      {
        name: 'Centro Técnico Automotriz',
        address: 'Calle César Nicolás Penson #56, Santo Domingo',
        phone: '809-555-0102',
        email: 'centrotecnico@taller.com',
        specialties: ['Diagnóstico Computarizado', 'Electricidad', 'Mecánica'],
        status: 'active'
      },
      {
        name: 'Taller Master Cars',
        address: 'Av. Abraham Lincoln #234, Santo Domingo',
        phone: '809-555-0103',
        email: 'mastercars@taller.com',
        specialties: ['Hojalatería', 'Pintura', 'Cristales'],
        status: 'active'
      }
    ]);

    console.log('Talleres de prueba creados exitosamente');

  } catch (error) {
    console.error('Error creando talleres:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedWorkshops();