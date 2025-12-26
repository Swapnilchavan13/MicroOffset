const mongoose = require("mongoose");
require("dotenv").config();
const MicroOffsetPack = require("../models/MicroOffsetPack");

const data = [
  {
    title: "Office Digital Usage",
    badge: "Most Popular",
    description: "Emails, cloud storage, video calls & daily work activities",
    emission: "2.5 kgCO₂ per week"
  },
  {
    title: "School Stationery",
    badge: "",
    description: "Notebooks, pencils, erasers & educational supplies",
    emission: "1.2 kgCO₂ per month"
  },
  {
    title: "Virtual Meetings",
    badge: "New",
    description: "Video conferences, screen sharing & remote collaboration",
    emission: "0.8 kgCO₂ per meeting"
  },
  {
    title: "OTT & Streaming",
    badge: "",
    description: "Netflix, YouTube, Spotify & entertainment streaming",
    emission: "3.1 kgCO₂ per month"
  },
  {
    title: "Mobile Usage",
    badge: "",
    description: "Apps, social media, calls & everyday phone activities",
    emission: "1.8 kgCO₂ per week"
  },
  {
    title: "Online Shopping",
    badge: "",
    description: "E-commerce browsing, orders & deliveries",
    emission: "2.0 kgCO₂ per month"
  },
  {
    title: "Cloud Storage",
    badge: "",
    description: "Google Drive, Dropbox & file backups",
    emission: "0.6 kgCO₂ per month"
  },
  {
    title: "Gaming",
    badge: "",
    description: "Online gaming, consoles & cloud gaming",
    emission: "4.2 kgCO₂ per week"
  },
  {
    title: "Social Media",
    badge: "",
    description: "Instagram, Facebook, Twitter & scrolling",
    emission: "1.1 kgCO₂ per week"
  },
  {
    title: "Smart Home Devices",
    badge: "",
    description: "IoT devices, smart speakers & automation",
    emission: "0.9 kgCO₂ per month"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await MicroOffsetPack.deleteMany(); // optional: clear old data
    await MicroOffsetPack.insertMany(data);
    console.log("✅ Data seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
