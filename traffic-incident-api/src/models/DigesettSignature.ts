import mongoose from 'mongoose';

const digesettSignatureSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
  officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DigesettOfficer', required: true },
  signature: { type: String, required: true },
  documentHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['valid', 'revoked'],
    default: 'valid'
  }
});

export default mongoose.model('DigesettSignature', digesettSignatureSchema);