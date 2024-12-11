// src/models/Workshop.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkshop extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const workshopSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  specialties: [{
    type: String,
    required: true
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