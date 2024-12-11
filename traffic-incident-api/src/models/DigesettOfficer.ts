import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const digesettOfficerSchema = new mongoose.Schema({
 name: { type: String, required: true },
 badge: { type: String, required: true, unique: true },
 password: { type: String, required: true, select: false },
 status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

digesettOfficerSchema.pre('save', async function(next) {
 if (!this.isModified('password')) return next();
 this.password = await bcrypt.hash(this.password, 10);
 next();
});

export const DigesettOfficer = mongoose.model('DigesettOfficer', digesettOfficerSchema);