// Package imports
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cors = require("cors"); //can remove once moved over to api gateway

// File imports
const swaggerDocument = require("./swagger.json");
const songRoutes = require("./routes/songRoutes");

// Initialize the app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); //can remove once moved over to api gateway
app.use(cors()); //can remove once moved over to api gateway
app.use(cors());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/", (req, res) => {
  res.send("Song Service is running.");
});
app.use("/api/songs", songRoutes);

// Database connection
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
