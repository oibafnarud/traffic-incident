// models/InsuranceLetter.ts
import mongoose from 'mongoose';

const InsuranceLetterSchema = new mongoose.Schema({
  incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  insuranceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance',
    required: true
  },
  policyNumber: {
    type: String,
    required: true
  },
  coverageDetails: {
    limit: Number,
    deductible: Number,
    type: String
  },
  documents: {
    digesettReport: String,
    driverLicense: String,
    vehicleRegistration: String,
    insuranceCard: String
  },
  signature: {
    signedBy: String,
    signedAt: Date,
    digitalSignature: String
  }
}, { timestamps: true });

export const InsuranceLetter = mongoose.model('InsuranceLetter', InsuranceLetterSchema);