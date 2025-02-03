require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const express = require("express");
const songRoutes = require("./routes/songRoutes");
const cors = require("cors"); //can remove once moved over to api gateway

const app = express();

app.use(cors()); //can remove once moved over to api gateway
app.use(express.json()); //can remove once moved over to api gateway

app.get("/", (req, res) => {
  res.send("Song Service is running.");
});

const PORT = process.env.PORT;

app.use(express.json());
// Routes
app.use("/api/songs", songRoutes);
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Song Service connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Song Service running on port ${PORT}`);
});
