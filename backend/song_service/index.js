require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const express = require("express");
const songRoutes = require("./routes/songRoutes");

const app = express();

app.get("/", (req, res) => {
  res.send("Song Service is running.");
});


const PORT = process.env.PORT;

app.use(express.json());
// Routes
app.use("/api/songs", songRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => {
    console.log("Blog Service connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Song Service running on port ${PORT}`);
});

