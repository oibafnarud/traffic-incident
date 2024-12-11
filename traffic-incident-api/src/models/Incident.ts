// src/models/Incident.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IOfficialReport {
  officerId: mongoose.Types.ObjectId;
  report: string;
  notes?: string;
  status: 'pending_signature' | 'completed';
  generatedAt: Date;
  signed?: boolean;
  signedAt?: Date;
}

export interface IIncident extends Document {
  reportedBy: mongoose.Types.ObjectId;
  date: Date;
  location: {
    type: string;
    coordinates: [number, number];
    address?: string;
  };
  description: string;
  involvedParties: Array<{
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    role: 'affected' | 'responsible';
    statement?: string;
  }>;
  vehicles: Array<mongoose.Types.ObjectId>;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  severity: 'minor' | 'moderate' | 'severe';
  photos: string[];
  insurance: Array<{
    company: mongoose.Types.ObjectId;
    claimNumber?: string;
    status?: 'pending' | 'approved' | 'rejected';
    processedAt?: Date;
  }>;
  officialReport?: IOfficialReport;
  createdAt: Date;
  updatedAt: Date;
}

const incidentSchema = new Schema({
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  description: {
    type: String,
    required: true
  },
  involvedParties: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    role: {
      type: String,
      enum: ['affected', 'responsible'],
      required: true
    },
    statement: String
  }],
  vehicles: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  severity: {
    type: String,
    enum: ['minor', 'moderate', 'severe'],
    required: true
  },
  photos: [String],
  insurance: [{
    company: {
      type: Schema.Types.ObjectId,
      ref: 'InsuranceCompany'
    },
    claimNumber: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    processedAt: Date
  }],
  officialReport: {
    officerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    report: String,
    notes: String,
    status: {
      type: String,
      enum: ['pending_signature', 'completed'],
      default: 'pending_signature'
    },
    generatedAt: Date,
    signed: {
      type: Boolean,
      default: false
    },
    signedAt: Date
  }
}, {
  timestamps: true
});

// Indexar la ubicación para consultas geoespaciales
incidentSchema.index({ location: '2dsphere' });

export const Incident = mongoose.model<IIncident>('Incident', incidentSchema);