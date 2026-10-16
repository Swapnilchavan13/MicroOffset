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
    dailyLimit: 100,
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
    dailyLimit: 100,
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
    dailyLimit: 100,
    kisanMitra: {
      name: "आनंद विश्वकर्मा",
      mobile: "9343817579",
      photo:
        "https://i.ibb.co/VpNK9v85/Whats-App-Image-2026-10-13-at-4-06-11-PM.jpg",
    },
  },
];

// acres field = trolley count (app sends number of trolleys)
const biomassEntrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "मक्का का पूरा पौधा",
        "भुट्टा + पत्ते (मिक्स)",
        // kept for old records only — app no longer sends this
        "मक्का का भुट्टा (Cob)",
      ],
    },
    // Number of trolleys (legacy field name: acres)
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
    dailyLimit: { type: Number, default: 100 },
    kisanMitra: { type: kisanMitraSchema, default: null },
  },
  { _id: false }
);

const locationFarmerSchema = new mongoose.Schema(
  {
    // ===== Section 1: Personal =====
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    upiId: { type: String, required: true, trim: true },

    // ===== Section 2: Farming =====
    landArea: { type: Number, required: true, min: 0 },
    crop: {
      type: String,
      required: true,
      enum: ["मक्का (Maize)", "धान (Rice)"],
      default: "मक्का (Maize)",
      trim: true,
    },

    // ===== Section 3: Biomass (trolley-based) =====
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
      default: "मक्का का पूरा पौधा",
    },
    thresherType: {
      type: String,
      required: true,
      enum: ["थ्रेशर प्रकार 1", "थ्रेशर प्रकार 2"],
      default: "थ्रेशर प्रकार 1",
      trim: true,
    },

    // ===== Section 4: Harvesting + Pickup dates =====
    harvestDate: { type: String, required: true, trim: true },
    threshingDate: { type: String, required: true, trim: true },
    collectionDate: { type: String, required: true, trim: true },
    dropDate: { type: String, trim: true, default: null },

    pedPickupDate: { type: String, required: true, trim: true },
    ginthiPickupDate: { type: String, required: true, trim: true },

    // ===== Section 5: Transport =====
    transportType: {
      type: String,
      required: true,
      enum: ["self", "pickup"],
      default: "self",
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
      required: false,
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

    // ===== Calculated fields (trolley pricing) =====
    // self: 0–10km = 1250, 10–20 = 1500, 20+ = 1750 per trolley
    // pickup: 250 per trolley
    totalTrolleys: { type: Number, default: 0 },
    ratePerTrolley: { type: Number, default: 0 },
    estimatedAmount: { type: Number, default: 0 },
    baseAmount: { type: Number, default: 0 },
    distanceCost: { type: Number, default: 0 },

    dailySlotCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

locationFarmerSchema.pre("save", function () {
  if (this.crop === "धान (Rice)") {
    this.biomassCategory = "धान (Rice)";
    if (!this.biomassType) {
      this.biomassType = "मक्का का पूरा पौधा";
    }
  }
});

locationFarmerSchema.index({ pedPickupDate: 1 });
locationFarmerSchema.index({ ginthiPickupDate: 1 });
locationFarmerSchema.index({ dropDate: 1 });

module.exports = mongoose.model("LocationFarmer", locationFarmerSchema);
module.exports.DEFAULT_DROP_POINTS = DEFAULT_DROP_POINTS;