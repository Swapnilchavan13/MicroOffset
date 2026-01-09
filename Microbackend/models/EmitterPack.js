const mongoose = require("mongoose");

const SelectedEmitterSchema = new mongoose.Schema(
  {
    emitter_id: mongoose.Schema.Types.ObjectId,
    emitter_name_standard: String,
    category: String,
    sub_category: String,
    tags: [String],
    quantity: Number,
    unit: String,
    factor_kgco2e_per_unit: Number,
    total_emission_kgco2e: Number,
  },
  { _id: false }
);

const EmitterPackSchema = new mongoose.Schema(
  {
    pack_name: { type: String, required: true },
    description: String,
    image_url: String, // ONE image only
    emitters: [SelectedEmitterSchema],
    total_emission_kgco2e: Number,
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmitterPack", EmitterPackSchema);
