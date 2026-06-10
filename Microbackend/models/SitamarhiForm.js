const mongoose = require("mongoose");

const sitamarhiFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      plotNumber: {
        type: String,
        required: true,
      },

      village: {
        type: String,
        required: true,
      },

      block: {
        type: String,
        required: true,
      },

      district: {
        type: String,
        required: true,
      },

      pin: {
        type: String,
        required: true,
      },
    },

    aadharNumber: {
      type: String,
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    landArea: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SitamarhiForm",
  sitamarhiFormSchema
);