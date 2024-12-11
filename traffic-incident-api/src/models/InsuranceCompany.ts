const insuranceCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  address: String,
  phone: String,
  email: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
 }, { timestamps: true });
 
 export const InsuranceCompany = mongoose.model('InsuranceCompany', insuranceCompanySchema);