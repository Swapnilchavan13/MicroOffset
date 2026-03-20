const mongoose = require("mongoose");

const GeneratedApiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CoinUser",
      required: true,
    },

    packId: {
      type: String,
      required: true,
    },

    apiKey: {
      type: String,
      required: true,
      unique: true,
    },

    link: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneratedApi", GeneratedApiSchema);