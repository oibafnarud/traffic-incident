// traffic-incident-api/src/models/Workshop.ts
import mongoose from 'mongoose';
import { IWorkshop } from '../interfaces/workshop.interface';

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  specialties: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

export const Workshop = mongoose.model<IWorkshop>('Workshop', workshopSchema);