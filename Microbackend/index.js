require('dns').setDefaultResultOrder('ipv4first');
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Emitter = require("./models/Emitter");
const EmitterPack = require("./models/EmitterPack");
const Project = require("./models/Project");
const CoinUser = require("./models/CoinUser");

const GeneratedApi = require("./models/GeneratedApi");
const Transaction = require("./models/Transaction");
const Razerpay = require("./models/Razerpay");

const Agreement = require('./models/Agreement');

const PopUp = require("./models/PopUp");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Razorpay = require("razorpay");
const crypto = require("crypto");

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {

    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({ message: "Invalid token" });

  }
};


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));




// MongoDB Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {

  try {

    const conn = await mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 10000,
});

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {

    console.log(
      "MongoDB connection failed:",
      error.message
    );

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


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
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
        show,
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

let parsedProjects = projects ? JSON.parse(projects) : [];

// 1️⃣ fetch projects from DB
const projectDocs = await Project.find(
  { _id: { $in: parsedProjects.map(p => p.project_ref) } },
  { title: 1, description: 1, image: 1 }
);

// 2️⃣ build lookup map
const projectMap = {};
projectDocs.forEach(p => {
  projectMap[p._id.toString()] = p;
});

// 3️⃣ enrich projects with DB data (INCLUDING IMAGE)
parsedProjects = parsedProjects.map((p) => {
  const dbProject = projectMap[p.project_ref];

  return {
    ...p,

    // copy from Project collection
    project_name: dbProject?.title,
    project_description: dbProject?.description,
    image: dbProject?.image, // ✅ THIS IS WHAT YOU WANT

    allocated_emission_kgco2e:
      p.allocated_emission_kgco2e ??
      total_emission_kgco2e / parsedProjects.length,
  };
});



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
        show,

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

app.put("/emitterpacks/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const {
      pack_name,
      description,
      packType,
      intendedBuyer,
      duration,
      emitters, // [{ emitter_id, quantity }]
      projects,
      weighted_price_per_kg,
      total_pack_price, 
      show,
    } = body;

    const existingPack = await EmitterPack.findById(id);
    if (!existingPack) {
      return res.status(404).json({ success: false, message: "Emitter pack not found" });
    }

    let updatedEmitters = [];
    let totalEmission = 0;

    if (emitters && emitters.length > 0) {
      const parsedEmitters = JSON.parse(emitters);

      updatedEmitters = await Promise.all(
        parsedEmitters.map(async (e) => {
          const emitterDoc = await Emitter.findById(e.emitter_id);
          if (!emitterDoc) throw new Error(`Emitter not found: ${e.emitter_id}`);

          const quantity = Number(e.quantity) || 1;
          const factor = emitterDoc.factor_kgco2e_per_unit || 0;
          const calculated = quantity * factor;
          totalEmission += calculated;

          return {
            emitter_id: emitterDoc._id,
            emitter_name_standard: emitterDoc.emitter_name_standard,
            sector: emitterDoc.sector,
            category: emitterDoc.category,
            sub_category: emitterDoc.sub_category,
            unit: emitterDoc.unit,
            quantity,
            factor_kgco2e_per_unit: factor,
            calculated_emission_kgco2e: calculated,
            source_type: emitterDoc.source_name ? "Public" : "Est.",
          };
        })
      );
    } else {
      // Keep existing emitters if none provided
      updatedEmitters = existingPack.emitters;
      totalEmission = updatedEmitters.reduce(
        (sum, e) => sum + (e.calculated_emission_kgco2e || 0),
        0
      );
    }

    // Handle projects
    let updatedProjects = [];
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      const projectDocs = await Project.find(
        { _id: { $in: parsedProjects.map(p => p.project_ref) } },
        { title: 1, description: 1, image: 1 }
      );

      const projectMap = {};
      projectDocs.forEach(p => (projectMap[p._id.toString()] = p));

      updatedProjects = parsedProjects.map(p => {
        const dbProject = projectMap[p.project_ref];
        return {
          ...p,
          project_name: dbProject?.title,
          project_description: dbProject?.description,
          project_image_url: dbProject?.image,
          allocated_emission_kgco2e: p.allocated_emission_kgco2e ?? totalEmission / parsedProjects.length
        };
      });
    }

    // Image handling
    const image_url = req.file ? `/uploads/${req.file.filename}` : existingPack.image_url;

    // Update pack
    const updatedPack = await EmitterPack.findByIdAndUpdate(
      id,
      {
        pack_name,
        description,
        packType,
        intendedBuyer,
        duration,
        emitters: updatedEmitters,
        total_emission_kgco2e: totalEmission,
        projects: updatedProjects,
        weighted_price_per_kg,
        total_pack_price,
        image_url,
        show: show === "true", // ✅ IMPORTANT
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({ success: true, data: updatedPack });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
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


// Edit Emitter Pack with optional image
app.put(
  "/editemitterpack/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        pack_name,
        description,
        packType,
        intendedBuyer,
        duration,
        emitters,
        projects,
        show
      } = req.body;

      const updateData = {
        pack_name,
        description,
        packType,
        intendedBuyer,
        duration,
      };

      if (emitters) updateData.emitters = JSON.parse(emitters);
      if (projects) updateData.projects = JSON.parse(projects);

      // ✅ FIX: convert and add show BEFORE update
      if (show !== undefined) {
        updateData.show = show === "true";
      }

      if (req.file) {
        updateData.image_url = `/uploads/${req.file.filename}`;
      }

      const updatedPack = await EmitterPack.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedPack) {
        return res.status(404).json({
          success: false,
          message: "Emitter pack not found",
        });
      }

      res.status(200).json({
        success: true,
        data: updatedPack,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);




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

///Add Projects

app.post("/addprojects", upload.single("image"), async (req, res) => {
  try {
    const {
      projectId,
      title,
      subHeading,
      description,
      location,
      status,
      retired,
      available,
      pricePerKgCO2,
      currency,
      projectDeveloper,
      verifiedBy,
      typeOfProject,
      projectType,
      co2Avoided,
    } = req.body;

    // Parse arrays safely
    const projectHighlighters = req.body.projectHighlighters
      ? JSON.parse(req.body.projectHighlighters)
      : [];

    const sdgs = req.body.sdgs ? JSON.parse(req.body.sdgs) : [];

    const newProject = new Project({
      projectId,
      title,
      subHeading,
      description,
      location,
      status,
      retired: Number(retired),
      available: Number(available),
      pricePerKgCO2: Number(pricePerKgCO2),
      currency,
      projectDeveloper,
      verifiedBy,
      typeOfProject,
      projectType,
      co2Avoided: Number(co2Avoided),
      projectHighlighters,
      sdgs,
      image: req.file ? req.file.filename : null,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


// REGISTER USER
app.post("/register", async (req, res) => {
  try {

    const { name, industry, location, gst, mobile, email, password } = req.body;

    const newUser = new CoinUser({
      name,
      industry,
      location,
      gst,
      mobile,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: savedUser
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: error.message
    });

  }
});

app.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await CoinUser.findOne({ mobile: String(mobile) });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // ✅ REAL JWT TOKEN
    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


app.get("/profile", authMiddleware, async (req, res) => {

  const user = await CoinUser.findById(req.user.id).select("-password");

  res.json(user);

});


app.post("/generate-pack-api", async (req, res) => {
  try {
    const { userId, packId } = req.body;

    if (!userId || !packId) {
      return res.status(400).json({
        success: false,
        message: "userId and packId required",
      });
    }

    // ✅ check user
    const user = await CoinUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

const { v4: uuidv4 } = require("uuid");

const apiKey = uuidv4();

    const newApi = await GeneratedApi.create({
      userId,
      packId,
      apiKey,
      link: `https://cooin.in/buy/${apiKey}`,
    });

    // ✅ attach API to user
    user.generatedApis.push(newApi._id);
    await user.save();

    res.json({
      success: true,
      message: "API generated successfully",
      data: newApi,
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/public-pack/:apiKey", async (req, res) => {
  try {
    const { apiKey } = req.params;

    const api = await GeneratedApi.findOne({ apiKey });

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "Invalid API link",
      });
    }

    const pack = await EmitterPack.findById(api.packId);

    res.json({
      success: true,
      pack,
      api,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.post("/buy-pack/:apiKey", async (req, res) => {
  try {
    const { apiKey } = req.params;
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const api = await GeneratedApi.findOne({ apiKey });

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "Invalid API",
      });
    }

    const pack = await EmitterPack.findById(api.packId);

    const transaction = await Transaction.create({
      apiId: api._id,
      packId: api.packId,

      buyerName: name,
      buyerEmail: email,
      buyerMobile: mobile,

      amount: pack?.total_pack_price || 0,
    });

    // attach transaction to original user
    await CoinUser.findByIdAndUpdate(api.userId, {
      $push: { transactions: transaction._id },
    });

    res.json({
      success: true,
      message: "Purchase successful",
      data: transaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/user-full-data/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await CoinUser.findById(userId)
      .populate("generatedApis")
      .populate("transactions");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//PopUp

app.post("/popup", async (req, res) => {
  try {
    const { name, email, company_or_organization, contact_number, enquiry } = req.body;

    // 🔥 Hardcoded source
    const source = "nettzero"; // change per deployment

    if (!name || !email || !enquiry) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, and Enquiry are required",
      });
    }

    const newPopUp = new PopUp({
      name,
      email,
      company_or_organization,
      contact_number,
      enquiry,
      source,
    });

    const savedData = await newPopUp.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: savedData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/getpopup", async (req, res) => {
  try {
    const enquiries = await PopUp.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount, packId, quantity } = req.body;

    console.log("AMOUNT RECEIVED:", amount);
    console.log("KEY:", process.env.RAZORPAY_KEY_ID);

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    console.log("OPTIONS:", options);

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order);

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    console.log("RAZORPAY ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.post("/verify-payment", async (req, res) => {

  try {

    console.log("VERIFY BODY:", req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      packId,
      quantity,
      userDetails,
    } = req.body;

    const generated_signature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET.trim()
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    console.log("GENERATED:", generated_signature);
    console.log("RECEIVED:", razorpay_signature);

    if (generated_signature !== razorpay_signature) {

  await Razerpay.findOneAndUpdate(
    { razorpay_order_id },

    {
      status: "failed",
    }
  );

  return res.status(400).json({
    success: false,
    message: "Invalid signature",
  });

}

   const pack = await EmitterPack.findById(packId);

if (!pack) {

  return res.status(404).json({
    success: false,
    message: "Pack not found",
  });

}

const payment = await Razerpay.create({

  razorpay_order_id,

  razorpay_payment_id,

  razorpay_signature,

  packId,

  quantity,

  amount: pack.total_pack_price * quantity,

  packDetails: {

    pack_name: pack.pack_name,

    description: pack.description,

    total_emission_kgco2e:
      pack.total_emission_kgco2e,

    total_pack_price:
      pack.total_pack_price,

    currency: pack.currency || "INR",

  },

  userDetails,

  status: "success",

});

  } catch (error) {

    console.log("VERIFY PAYMENT ERROR:");
    console.log(error);
    console.log(error.message);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }
});

app.get("/razerpay-orders", async (req, res) => {

  try {

    const orders = await Razerpay
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


app.post("/payment-failed", async (req, res) => {

  try {

    const { razorpay_order_id } = req.body;

    await Razerpay.findOneAndUpdate(
      { razorpay_order_id },
      { status: "failed" }
    );

    res.json({
      success: true,
      message: "Payment marked failed",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// 1. POST Request: नया फॉर्म डेटाबेस में सेव करने के लिए
app.post('/agreements', async (req, res) => {
  try {
    const newAgreement = new Agreement(req.body);
    const savedRecord = await newAgreement.save();
    res.status(201).json({ success: true, data: savedRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. GET Request: सभी भरे हुए फॉर्म्स का डेटा वापस फ़ेच करने के लिए
app.get('/getagreements', async (req, res) => {
  try {
    const records = await Agreement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
