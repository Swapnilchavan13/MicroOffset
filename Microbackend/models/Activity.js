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
      type: String,
      default: "",
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
      address: String,
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