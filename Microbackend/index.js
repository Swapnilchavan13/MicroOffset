const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const MicroOffsetPack = require("./models/MicroOffsetPack");
const Emitter = require("./models/Emitter");
const EmitterPack = require("./models/EmitterPack");




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Call DB connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running and MongoDB is connected!");
});



app.get("/api/microoffsetpacks", async (req, res) => {
  try {
    const packs = await MicroOffsetPack.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: packs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/emitters", async (req, res) => {
  try {
    const emitters = await Emitter.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: emitters
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.post("/addemitterpacks", async (req, res) => {
  try {
    const {
      pack_name,
      description,
      image_url,
      emitters,
      total_emission_kgco2e,
    } = req.body;

    if (!pack_name || !emitters?.length) {
      return res.status(400).json({
        success: false,
        message: "Pack name and at least one emitter are required",
      });
    }

    const pack = await EmitterPack.create({
      pack_name,
      description,
      image_url,
      emitters,
      total_emission_kgco2e,
      status: "draft",
    });

    res.status(201).json({
      success: true,
      data: pack,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/getemitterpacks", async (req, res) => {
  try {
    const packs = await EmitterPack.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: packs.length,
      data: packs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});




// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
