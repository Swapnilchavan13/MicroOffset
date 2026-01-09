const mongoose = require("mongoose");

const SelectedEmitterSchema = new mongoose.Schema(
  {
    emitter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emitter",
      required: true,
    },
    emitter_name_standard: {
      type: String,
      required: true,
    },
    category: String,
    sub_category: String,
    tags: [String],

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      default: "kWh",
    },

    factor_kgco2e_per_unit: {
      type: Number,
      required: true,
    },

    total_emission_kgco2e: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const EmitterPackSchema = new mongoose.Schema(
  {
    pack_name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image_url: {
      type: String, // later can be S3 / Cloudinary
    },

    emitters: {
      type: [SelectedEmitterSchema],
      required: true,
    },

    total_emission_kgco2e: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    created_by: {
      type: String, // later ObjectId(User)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmitterPack", EmitterPackSchema);
