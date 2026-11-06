const mongoose = require("mongoose");

const cleaningScheduleSchema = new mongoose.Schema(
  {
    cleaningDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "आपका खेत साफ करने की तारीख",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CleaningSchedule", cleaningScheduleSchema);