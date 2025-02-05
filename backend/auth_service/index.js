//package imports
require("dotenv").config(); // Load environment variables from .env file
const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const url = require("url");
const cors = require("cors");
// const open = require("open");
// const destroyer = require("server-destroy");
// const { OAuth2Client } = require("google-auth-library");
// const url = require("url");
// const open = require("open");
// const destroyer = require("server-destroy");

//file imports
const userRoutes = require("./routes/userRoutes");

//initialize express app
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());

// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

//Download OAuth2 configuration from Google
// const keys = require('./oauth2.keys.json');

// async function main() {
// Getting the OAuth2 client
// const oAuth2Client = await getAutheticatedClient();
// Get the user's profile
// }

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

// app.get("/auth/google", (req, res) => {
//   const authorizeUrl = client.generateAuthUrl({
//     access_type: "offline",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "openid",
//     ],
//   });
//   res.redirect(authorizeUrl);
// });

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
