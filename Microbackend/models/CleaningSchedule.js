const mongoose = require("mongoose");

const cleaningScheduleSchema = new mongoose.Schema(
  {
    cleaningDate: {
      type: Date,
      default: null, // शुरुआत में तारीख खाली/null रहेगी जो CMS से सेट होगी
    },
    praptRashi: {
      type: Number,
      default: 0, // शुरुआत में राशि 0 रहेगी
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