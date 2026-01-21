const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Emitter = require("./models/Emitter");
const EmitterPack = require("./models/EmitterPack");
const Project = require("./models/Project");





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
      const body = req.body || {};

      const {
        pack_name,
        description,
        packType,
        intendedBuyer,
        duration,
        emitters,
        projects,
        total_emission_kgco2e,
        weighted_price_per_kg,
        total_pack_price,
      } = body;

      if (!pack_name || !emitters) {
        return res.status(400).json({
          success: false,
          message: "Pack name and emitters are required",
        });
      }

const parsedEmitters = JSON.parse(emitters).map((e) => ({
  ...e,
  calculated_emission_kgco2e:
    e.calculated_emission_kgco2e ??
    e.quantity * e.factor_kgco2e_per_unit,
}));

const parsedProjects = projects
  ? JSON.parse(projects).map((p) => ({
      ...p,
      allocated_emission_kgco2e:
        p.allocated_emission_kgco2e ??
        (total_emission_kgco2e / JSON.parse(projects).length),
    }))
  : [];


      const image_url = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const pack = await EmitterPack.create({
        pack_name,
        description,
        image_url,
        packType,
        intendedBuyer,
        duration,

        emitters: parsedEmitters,
        projects: parsedProjects,

        total_emission_kgco2e,
        weighted_price_per_kg,
        total_pack_price,

        frozenAt: new Date(),
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


app.get("/getemitterpacks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pack = await EmitterPack.findById(id);

    if (!pack) {
      return res.status(404).json({
        success: false,
        message: "Emitter pack not found",
      });
    }

    res.status(200).json({
      success: true,
      data: pack,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/projects", async (req, res) => {
  try {
    const { status, sdg, minPrice, maxPrice } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (sdg) filter.sdgs = Number(sdg);

    if (minPrice || maxPrice) {
      filter.pricePerKgCO2 = {};
      if (minPrice) filter.pricePerKgCO2.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerKgCO2.$lte = Number(maxPrice);
    }

    const projects = await Project.find(filter);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
});





// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
