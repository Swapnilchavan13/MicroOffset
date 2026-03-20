const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedApi",
      required: true,
    },

    packId: {
      type: String,
      required: true,
    },

    buyerName: {
      type: String,
      required: true,
    },

    buyerEmail: {
      type: String,
      required: true,
    },

    buyerMobile: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      default: 100, // you can change dynamically later
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);