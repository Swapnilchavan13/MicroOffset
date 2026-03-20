const mongoose = require("mongoose");

const CoinUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    gst: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // 🔥 NEW: Track generated APIs
    generatedApis: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneratedApi",
      },
    ],

    // 🔥 NEW: Track transactions
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoinUser", CoinUserSchema);