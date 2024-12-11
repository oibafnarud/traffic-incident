// src/models/Evidence.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IEvidence extends Document {
  incidentId: mongoose.Types.ObjectId;
  fileUrl: string;
  fileType: string;
  uploadedBy: mongoose.Types.ObjectId;
  verified: boolean;
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const evidenceSchema = new Schema({
  incidentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Incident', 
    required: true 
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  fileType: { 
    type: String, 
    required: true 
  },
  uploadedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  verifiedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  verifiedAt: { 
    type: Date 
  }
}, {
  timestamps: true
});

export const Evidence = mongoose.model<IEvidence>('Evidence', evidenceSchema);