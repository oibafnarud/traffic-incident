// traffic-incident-api/models/Vehicle.ts
import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true
 },
 brand: {
   type: String,
   required: true
 },
 model: {
   type: String,
   required: true
 },
 year: {
   type: String,
   required: true
 },
 plate: {
   type: String,
   required: true,
   unique: true
 },
 chasis: {
   type: String,
   required: true,
   unique: true
 },
 color: String,
 insurance: {
   company: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'InsuranceCompany',
     required: true
   },
   policyNumber: {
     type: String,
     required: true
   },
   expiryDate: {
     type: Date,
     required: true
   }
 },
 documents: {
   registration: {
     fileUrl: String,
     expiryDate: Date,
     verified: {
       type: Boolean,
       default: false
     }
   }
 },
 status: {
   type: String,
   enum: ['active', 'inactive'],
   default: 'active'
 }
}, {
 timestamps: true
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);