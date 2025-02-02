//package imports
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
<<<<<<< HEAD
const { OAuth2Client } = require("google-auth-library");
const http = require("http");
const url = require("url");
const open = require("open");
const destroyer = require("server-destroy");
const app = express();
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

//Download OAuth2 configuration from Google
// const keys = require('./oauth2.keys.json');

async function main() {
  // Getting the OAuth2 client
  const oAuth2Client = await getAutheticatedClient();
  // Get the user's profile
}

// Test auth service is runing
app.get("/", (req, res) => {
  res.send("Auth Service is running.");
});

//Documentation for your reference
//1. Protocol for OAuth2 - Guide to using OAuth2
// https://developers.google.com/identity/protocols/oauth2
//2. Scopes - define of access to user data for Google APIs
// https://developers.google.com/identity/protocols/oauth2/scopes
//3. Send access token to an API in a Authorization request header
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
app.get("/auth/google", (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });
  res.redirect(authorizeUrl);
});

=======
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//file imports
const userRoutes = require("./routes/userRoutes");

//initialize express app
const app = express();
>>>>>>> d8d5e0914223720fc1e293464b2c3835e74183c5
const PORT = process.env.PORT;

//middleware setup
app.use(cors());
app.use(bodyParser.json());

//mount routes
app.use("/api/users", userRoutes);

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Auth Service connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
