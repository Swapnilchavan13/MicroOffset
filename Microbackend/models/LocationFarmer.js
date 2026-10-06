const mongoose = require("mongoose");

// ==========================================
// DROP POINTS + KISAN MITRA (editable in DB)
// ==========================================
const DEFAULT_DROP_POINTS = [
  {
    name: "NettZero Factory",
    village: "Sagar",
    latitude: 23.817694,
    longitude: 79.410778,
    isFactory: true,
    totalCapacityTonnes: 5000,       // total limit
    dailyLimit: 100,                 // max entries per day
    kisanMitra: {
      name: "राजेश कुमार",
      mobile: "9876543210",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    name: "Drop Point 2",
    village: "Bhainsa",
    latitude: 23.91,
    longitude: 79.31,
    isFactory: false,
    totalCapacityTonnes: 5000,
    dailyLimit: 100,
    kisanMitra: {
      name: "सुरेश पटेल",
      mobile: "9876543211",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
  {
    name: "Drop Point 3",
    village: "Rahatgarh",
    latitude: 23.75,
    longitude: 79.3,
    isFactory: false,
    totalCapacityTonnes: 5000,
    dailyLimit: 100,
    kisanMitra: {
      name: "अनिल शर्मा",
      mobile: "9876543212",
      photo: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  },
  {
    name: "Drop Point 4",
    village: "Khurai",
    latitude: 23.9,
    longitude: 79.55,
    isFactory: false,
    totalCapacityTonnes: 5000,
    dailyLimit: 100,
    kisanMitra: {
      name: "विकास यादव",
      mobile: "9876543213",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
];

const biomassEntrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "मक्का का पूरा पौधा",
        "मक्का का भुट्टा (Cob)",
        "भुट्टा + पत्ते (मिक्स)",
      ],
    },
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
      default: "मक्का का भुट्टा (Cob)",
    },
    thresherType: {
      type: String,
      required: true,
      enum: ["थ्रेशर प्रकार 1", "थ्रेशर प्रकार 2"],
      default: "थ्रेशर प्रकार 1",
      trim: true,
    },

    // ===== Section 4: Harvesting =====
    harvestDate: { type: String, required: true, trim: true },
    threshingDate: { type: String, required: true, trim: true },
    collectionDate: { type: String, required: true, trim: true },
    dropDate: { type: String, trim: true, default: null },

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

    // ===== Calculated fields =====
    estimatedAmount: { type: Number, default: 0 },
    baseAmount: { type: Number, default: 0 },
    distanceCost: { type: Number, default: 0 },

    // How many "slots" this farmer uses on dropDate
    // = number of biomassEntries with acres > 0
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


module.exports = mongoose.model("LocationFarmer", locationFarmerSchema);
module.exports.DEFAULT_DROP_POINTS = DEFAULT_DROP_POINTS;