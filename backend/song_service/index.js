require("dotenv").config();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cors = require("cors"); //can remove once moved over to api gateway
const cookieParser = require("cookie-parser");

const swaggerDocument = require("./swagger.json"); // File imports
const songRoutes = require("./routes/songRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Allow only your frontend
    credentials: true, // ✅ Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow only specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow only specific headers
  })
);
app.use(cookieParser());
app.options("*", cors()); // ✅ Handle preflight requests

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/", (req, res) => {
  res.send("Song Service is running.");
});
app.use("/api/songs", songRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Song Service connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

if (process.env.DEPLOY_AWS_LAMBDA) {
  //Deploy to AWS Lambda
  const serverless = require("serverless-http");
  module.exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
    console.log(`Song Service running on port ${PORT}`);
  });
}
