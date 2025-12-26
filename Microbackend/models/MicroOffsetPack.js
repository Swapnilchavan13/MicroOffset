const mongoose = require("mongoose");

const microOffsetPackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    badge: { type: String, default: "" },
    description: { type: String, required: true },
    emission: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MicroOffsetPack", microOffsetPackSchema);
