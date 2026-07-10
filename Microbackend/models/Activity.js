const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    activityType: {
      type: String,
      enum: ["fertilizer", "water", "harvest", "soil"],
      required: true,
    },

    volume: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    location: {
      latitude: String,
      longitude: String,
    },

    activityDate: {
      type: Date,
      default: Date.now,
    },

    // Water
    motorHP: {
      type: String,
      default: "",
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    durationHours: {
      type: Number,
      default: 0,
    },

    // Soil
    soilReport: {
      type: String,
      default: "",
    },

    soilType: {
      type: String,
      default: "",
    },

    // Harvest
    paniclesPerSqm: {
      type: Number,
      default: 0,
    },

    plantHeight: {
      type: Number,
      default: 0,
    },

    leafLength: {
      type: Number,
      default: 0,
    },

    leafWidth: {
      type: Number,
      default: 0,
    },

    panicleLength: {
      type: Number,
      default: 0,
    },

    grainsPerPanicle: {
      type: Number,
      default: 0,
    },

    thousandSeedWeight: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", ActivitySchema);