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
    retiredPercent: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
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
      type: [Number], // e.g. [13, 15, 12]
      required: true,
    },
    pricePerKgCO2: {
      type: Number, // store numeric value only
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
