const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const MicroOffsetPack = require("./models/MicroOffsetPack");


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

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
  ]);
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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
