const mongoose = require("mongoose");

const farmerpickupSchema = new mongoose.Schema(
  {
    mobile: {
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
    supervisorName: {
      type: String,
      required: true,
      trim: true,
    },
    cropType: {
      type: String,
      enum: ["Dhan Parali/Narvai", "Makka Ginthi"],
      required: true,
    },
    praptRashi: {
  type: Number,
  default: 0,
},
    acres: {
      type: Number,
      required: true,
      min: 0.1,
    },
    village: {
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
    },
    photo: {
      type: String,
      required: true,
    },
    isCleaned: {
      type: Boolean,
      default: false,
    },
    // ✅ हर किसान की अपनी अलग तारीख
    cleaningDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FarmerPickup", farmerpickupSchema);