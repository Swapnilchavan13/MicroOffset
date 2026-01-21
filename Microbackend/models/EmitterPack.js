const mongoose = require("mongoose");

/* ---------- Sub Schemas ---------- */

// Snapshot of emitters at pack creation time
const PackEmitterSchema = new mongoose.Schema(
  {
    emitter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emitter",
      required: true,
    },
    emitter_name_standard: { type: String, required: true },
    sector: { type: String },
    category: { type: String },
    sub_category: { type: String },

    unit: { type: String },
    quantity: { type: Number, required: true },

    factor_kgco2e_per_unit: { type: Number, required: true },
    calculated_emission_kgco2e: { type: Number, required: true },

    source_type: {
      type: String,
      enum: ["Est.", "Public"],
    },
  },
  { _id: false }
);

// Snapshot of selected offset projects
const PackProjectSchema = new mongoose.Schema(
  {
     // 🔗 Reference
    project_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    projectId: { type: String, required: true },
    allocation_percent: { type: Number, required: true },

    price_per_kg: { type: Number, required: true },
    allocated_emission_kgco2e: { type: Number, required: true },
    allocated_cost: { type: Number, required: true },

      // 📦 Availability snapshot (NEW)
    total_credits_kg: { type: Number },
    retired_credits_kg: { type: Number },
  },
  { _id: false }
);

/* ---------- Main Schema ---------- */

const EmitterPackSchema = new mongoose.Schema(
  {
    /* ===== Pack Identity ===== */
    pack_name: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },

    /* ===== Pack Configuration ===== */
    packType: { type: String }, // Office / Event / Personal
    intendedBuyer: { type: String }, // Company / Individual
    duration: { type: String }, // Per Month / One Time / Per Year

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },

    /* ===== Emissions ===== */
    emitters: { type: [PackEmitterSchema], required: true },

    total_emission_kgco2e: { type: Number, required: true },

    /* ===== Offset Projects ===== */
    projects: { type: [PackProjectSchema] },

    weighted_price_per_kg: { type: Number },
    total_pack_price: { type: Number },
    currency: { type: String, default: "INR" },

    /* ===== Audit / Versioning ===== */
    version: { type: Number, default: 1 },
    frozenAt: { type: Date },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("EmitterPack", EmitterPackSchema);
