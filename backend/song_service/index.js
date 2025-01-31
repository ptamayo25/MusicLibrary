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

// const express = require("express"); // Import the Express.js framework for building the API Gateway
// //const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
// //const bodyParser = require("body-parser"); // Middleware to parse incoming JSON request bodies
// //const gatewayRoutes = require("./routes/gatewayRoutes"); // Import API Gateway routes
// //const logger = require("./gatewayLogger/logger"); // Import the custom logger middleware to log requests and responses
// //const loggerMiddleware = require("./gatewayLogger/logger").middleware;

// // Initialize the Express.js application
// const app = express();

// // Set the port from environment variables, or use 5000 as a default
// const PORT = process.env.PORT || 5005;

// app.use("/api", gatewayRoutes);

// // Start the server
// app.listen(PORT, () => {
//   logger.info({ message: `API Gateway is running on port ${PORT}` });
//   console.log(`API Gateway is running on port ${PORT}`);
// });
