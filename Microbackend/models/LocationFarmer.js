const mongoose = require("mongoose");

const locationFarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    landArea: {
      type: Number,
      required: true,
      min: 0,
    },

    crop: {
      type: String,
      required: true,
      trim: true,
    },

    thresherType: {
      type: String,
      required: true,
      enum: ["Ginti Separate", "Mixed"],
      default: "Ginti Separate",
      trim: true,
    },

    collectionDate: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },

      accuracy: {
        type: Number,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LocationFarmer",
  locationFarmerSchema
);