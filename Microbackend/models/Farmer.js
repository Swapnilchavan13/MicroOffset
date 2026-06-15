const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema(
  {
    stageNumber: {
      type: Number,
      required: true,
    },

    fertilizerName: {
      type: String,
      required: true,
    },

    areaApplied: {
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

    video: {
      type: String,
      default: "",
    },

    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const FarmerSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: Number,

    state: String,

    city: String,

    village: String,

    landArea: {
      type: Number,
      default: 0,
    },

    cropName: String,

    fertilizerName: String,

    progress: {
      type: [Boolean],
      default: [
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },

    stages: {
      type: [StageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Farmer",
  FarmerSchema
);