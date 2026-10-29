const mongoose = require("mongoose");

// ==========================================
// DROP POINTS + KISAN MITRA
// ==========================================
const DEFAULT_DROP_POINTS = [
  {
    name: "NettZero Factory",
    village: "NettZero Factory",
    latitude: 23.817694,
    longitude: 79.410778,
    isFactory: true,
    totalCapacityTonnes: 5000,
    dailyLimit: 500, // updated to 500 acres
    kisanMitra: {
      name: "देवेन्द्र विश्वकर्मा",
      mobile: "9131876930",
      photo:
        "https://i.ibb.co/zVwMbHsh/Whats-App-Image-2026-10-13-at-4-08-49-PM.jpg",
    },
  },
  {
    name: "इमलिया",
    village: "इमलिया",
    latitude: 23.587306,
    longitude: 79.410083,
    isFactory: false,
    totalCapacityTonnes: 5000,
    dailyLimit: 500,
    kisanMitra: {
      name: "विनोद लोधी",
      mobile: "8839114261",
      photo:
        "https://i.ibb.co/N2mcSWMp/Whats-App-Image-2026-10-13-at-4-03-09-PM.jpg",
    },
  },
  {
    name: "नोहटा",
    village: "नोहटा",
    latitude: 23.670361,
    longitude: 79.586111,
    isFactory: false,
    totalCapacityTonnes: 5000,
    dailyLimit: 500,
    kisanMitra: {
      name: "आनंद विश्वकर्मा",
      mobile: "9343817579",
      photo:
        "https://i.ibb.co/VpNK9v85/Whats-App-Image-2026-10-13-at-4-06-11-PM.jpg",
    },
  },
];

// ==========================================
// BIOMASS ENTRY (now Acre based)
// ==========================================
const biomassEntrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "भुट्टा + पत्ते (मिक्स)", // Makka Ginthi Mix
        "धान (Rice)",
        // old values kept for backward compatibility
        "मक्का का पूरा पौधा",
        "मक्का का भुट्टा (Cob)",
      ],
    },
    // Now this is actual Acres (not trolleys)
    acres: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const kisanMitraSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    photo: { type: String, default: null },
  },
  { _id: false }
);

const dropPointSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    village: { type: String, required: true, trim: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    isFactory: { type: Boolean, default: false },
    distanceKm: { type: Number, default: null },
    totalCapacityTonnes: { type: Number, default: 5000 },
    dailyLimit: { type: Number, default: 500 },
    kisanMitra: { type: kisanMitraSchema, default: null },
  },
  { _id: false }
);

// ==========================================
// MAIN SCHEMA
// ==========================================
const locationFarmerSchema = new mongoose.Schema(
  {
    // ===== Section 1: Personal =====
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    upiId: { type: String, required: true, trim: true },

    // Referral (only for new users)
    referralName: { type: String, trim: true, default: null },

    // ===== Section 2: Farming =====
    landArea: { type: Number, required: true, min: 0 },
    crop: {
      type: String,
      required: true,
      enum: ["मक्का (Maize)", "धान (Rice)"],
      default: "मक्का (Maize)",
      trim: true,
    },

    // ===== Section 3: Biomass =====
    biomassCategory: {
      type: String,
      required: true,
      enum: ["मक्का (Maize)", "धान (Rice)"],
      default: "मक्का (Maize)",
      trim: true,
    },
    biomassEntries: {
      type: [biomassEntrySchema],
      default: [],
    },
    biomassType: {
      type: String,
      trim: true,
      default: "भुट्टा + पत्ते (मिक्स)",
    },
    thresherType: {
      type: String,
      // not required because Dhan doesn't use it
      enum: ["थ्रेशर प्रकार 1", "थ्रेशर प्रकार 2", ""],
      default: "थ्रेशर प्रकार 1",
      trim: true,
    },

    // ===== Section 4: Dates =====
    harvestDate: { type: String, trim: true, default: null },       // optional for Dhan
    threshingDate: { type: String, trim: true, default: null },     // optional for Dhan
    collectionDate: { type: String, trim: true, default: null },    // same as threshingDate
    pickupDate: { type: String, trim: true, default: null },        // new single pickup date

    // Old fields kept for backward compatibility (not required anymore)
    pedPickupDate: { type: String, trim: true, default: null },
    ginthiPickupDate: { type: String, trim: true, default: null },
    dropDate: { type: String, trim: true, default: null },

    // ===== Section 5: Transport =====
    transportType: {
      type: String,
      required: true,
      enum: ["pickup"], // only pickup allowed now
      default: "pickup",
      trim: true,
    },

    // ===== Section 6: Location =====
    villageName: { type: String, required: true, trim: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      accuracy: { type: Number, default: null },
    },
    farmPhoto: {
      type: String,
      default: null,
    },

    // ===== Drop points =====
    dropPoints: {
      type: [dropPointSchema],
      default: DEFAULT_DROP_POINTS,
    },
    assignedDropPoint: {
      type: dropPointSchema,
      default: null,
    },

    // ===== Calculated fields (Acre based) =====
    totalAcres: { type: Number, default: 0 },
    ratePerAcre: { type: Number, default: 0 },
    estimatedAmount: { type: Number, default: 0 },
    baseAmount: { type: Number, default: 0 },
    distanceCost: { type: Number, default: 0 },

    // kept for old records
    totalTrolleys: { type: Number, default: 0 },
    ratePerTrolley: { type: Number, default: 0 },
    dailySlotCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ==========================================
// PRE-SAVE HOOK
// ==========================================
locationFarmerSchema.pre("save", function () {
  // Auto set biomassCategory based on crop
  if (this.crop === "धान (Rice)") {
    this.biomassCategory = "धान (Rice)";
    this.biomassType = "धान (Rice)";
  } else {
    this.biomassCategory = "मक्का (Maize)";
    if (!this.biomassType || this.biomassType === "मक्का का पूरा पौधा") {
      this.biomassType = "भुट्टा + पत्ते (मिक्स)";
    }
  }

  // Force transportType
  this.transportType = "pickup";
});

// ==========================================
// INDEXES
// ==========================================
locationFarmerSchema.index({ pickupDate: 1 });
locationFarmerSchema.index({ threshingDate: 1 });
locationFarmerSchema.index({ mobile: 1 });
locationFarmerSchema.index({ referralName: 1 });

// Old indexes kept
locationFarmerSchema.index({ pedPickupDate: 1 });
locationFarmerSchema.index({ ginthiPickupDate: 1 });
locationFarmerSchema.index({ dropDate: 1 });

module.exports = mongoose.model("LocationFarmer", locationFarmerSchema);
module.exports.DEFAULT_DROP_POINTS = DEFAULT_DROP_POINTS;