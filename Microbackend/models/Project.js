const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "MicroOffsets Retired",
        "Fully Retired",
        "Paused",
      ],
      required: true,
    },

    // Absolute values only (kg CO2)
    retired: {
      type: Number,
      required: true,
      min: 0,
    },

    available: {
      type: Number,
      required: true,
      min: 0,
    },

    sdgs: {
      type: [Number],
      required: true,
    },

    pricePerKgCO2: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Optional virtual (no DB storage)
projectSchema.virtual("retiredPercent").get(function () {
  const total = this.available;
  return total > 0 ? Math.round((this.retired / total) * 100) : 0;
});

module.exports = mongoose.model("Project", projectSchema);
