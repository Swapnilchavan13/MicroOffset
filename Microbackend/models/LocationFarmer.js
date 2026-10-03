const mongoose = require("mongoose");

const locationFarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    landArea: {
      type: Number,
      required: true,
      min: 0,
    },

    crop: {
      type: String,
      required: true,
      enum: ["मक्का (Maize)", "धान (Rice)"],
      default: "मक्का (Maize)",
      trim: true,
    },

    biomassCategory: {
      type: String,
      required: true,
      enum: ["मक्का (Maize)", "धान (Rice)"],
      default: "मक्का (Maize)",
      trim: true,
    },

    biomassType: {
      type: String,
      required: true,
      enum: [
        "मक्का का पूरा पौधा",
        "मक्का का भुट्टा (Cob)",
        "भुट्टा + पत्ते (मिक्स)",
      ],
      default: "मक्का का भुट्टा (Cob)",
      trim: true,
    },

    thresherType: {
      type: String,
      required: true,
      enum: ["थ्रेशर प्रकार 1", "थ्रेशर प्रकार 2"],
      default: "थ्रेशर प्रकार 1",
      trim: true,
    },

    harvestDate: {
      type: String,
      required: true,
      trim: true,
    },

    threshingDate: {
      type: String,
      required: true,
      trim: true,
    },

    collectionDate: {
      type: String,
      required: true,
      trim: true,
    },

    transportType: {
      type: String,
      required: true,
      enum: ["self", "pickup"],
      default: "self",
      trim: true,
    },

    villageName: {
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

      accuracy: {
        type: Number,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Middleware: Automatically handle rule when crop is धान (Rice) before saving
locationFarmerSchema.pre("save", function (next) {
  if (this.crop === "धान (Rice)") {
    this.biomassCategory = "धान (Rice)";
    this.biomassType = "मक्का का पूरा पौधा";
  }
  next();
});

// Middleware: Enforce same rule for update operations
locationFarmerSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.crop === "धान (Rice)" || update.$set?.crop === "धान (Rice)") {
    if (update.$set) {
      update.$set.biomassCategory = "धान (Rice)";
      update.$set.biomassType = "मक्का का पूरा पौधा";
    } else {
      update.biomassCategory = "धान (Rice)";
      update.biomassType = "मक्का का पूरा पौधा";
    }
  }
  next();
});

module.exports = mongoose.model("LocationFarmer", locationFarmerSchema);