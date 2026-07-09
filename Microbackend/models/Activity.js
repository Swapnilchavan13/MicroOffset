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
      enum: [
        "fertilizer",
        "water",
        "harvest",
      ],
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
      latitude: Number,
      longitude: Number,
    },

    // Water Specific
    motorHP: {
      type: Number,
      default: null,
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

    activityDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Activity",
  ActivitySchema
);