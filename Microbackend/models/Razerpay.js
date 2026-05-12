const mongoose = require("mongoose");

const razerpaySchema = new mongoose.Schema({

  razorpay_order_id: String,

  razorpay_payment_id: String,

  razorpay_signature: String,

  packId: String,

  quantity: Number,

  amount: Number,

  packDetails: {

    pack_name: String,

    description: String,

    total_emission_kgco2e: Number,

    total_pack_price: Number,

    currency: String,

  },

  userDetails: {

    name: String,

    email: String,

    phone: String,

    projectId: String,

    projectTitle: String,

  },

  status: {

    type: String,

    default: "pending",

  },

}, { timestamps: true });

module.exports = mongoose.model("Razerpay", razerpaySchema);