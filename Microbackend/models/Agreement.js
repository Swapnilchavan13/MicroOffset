const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
  agreementDate: { type: String, required: true },
  farmerName: { type: String, required: true },
  fatherHusbandName: { type: String, required: true },
  farmerMobile: { type: String, required: true }, 
  landArea: { type: String, required: true },
  aadhaar: { type: String, required: true },
  village: { type: String, required: true },
  taluka: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  buyerSignatory: { type: String, required: true },
  buyerDesignation: { type: String, required: true },
  witness1: { type: String },
  witness2: { type: String },
  formFilledBy: { type: String, required: true }, 
  // नई वैकल्पिक फ़ाइल पाथ फ़ील्ड्स
  agreementPage1: { type: String, default: "" },
  agreementPage2: { type: String, default: "" },
  agreementPage3: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agreement', AgreementSchema);