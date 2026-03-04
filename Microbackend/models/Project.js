const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    subHeading: String,
    description: String,
    location: String,
    status: String,
    retired: Number,
    available: Number,
    pricePerKgCO2: Number,
    currency: String,

    projectDeveloper: String,
    verifiedBy: String,
    typeOfProject: String,
    projectType: String,

    projectHighlighters: [String],
    co2Avoided: Number,
    sdgs: [Number],

    image: String, // store image filename
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);