const mongoose = require("mongoose");

const EmitterSchema = new mongoose.Schema(
  {
    emitter_code: { type: String, required: true },
    emitter_name_standard: { type: String, required: true },
    sector: { type: String },
    category: { type: String },
    sub_category: { type: String },
    scope_default: { type: Number },
    unit: { type: String },
    factor_kgco2e_per_unit: { type: Number },
    geography: { type: String },
    year: { type: Number },
    source_name: { type: String },
    source_url: { type: String },
    tags: { type: [String] }, // array of strings
    notes: { type: String }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Emitter", EmitterSchema);
