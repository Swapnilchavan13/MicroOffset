const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Emitter = require("./models/Emitter");
const EmitterPack = require("./models/EmitterPack");




const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


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



const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});




// Routes
app.get("/", (req, res) => {
  res.send("Backend is running live and MongoDB is connected!");
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


app.post(
  "/addemitterpacks",
  upload.single("image"),
  async (req, res) => {
    try {
      // ✅ SAFELY READ BODY
      const body = req.body || {};

      const pack_name = body.pack_name;
      const description = body.description;
      const emitters = body.emitters;
      const total_emission_kgco2e = body.total_emission_kgco2e;

      if (!pack_name || !emitters) {
        return res.status(400).json({
          success: false,
          message: "Pack name and emitters are required",
        });
      }

      let parsedEmitters;
      try {
        parsedEmitters = JSON.parse(emitters);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid emitters format",
        });
      }

      const image_url = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const pack = await EmitterPack.create({
        pack_name,
        description,
        image_url,
        emitters: parsedEmitters,
        total_emission_kgco2e,
      });

      res.status(201).json({
        success: true,
        data: pack,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);


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
