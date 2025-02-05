require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Import file

// Google OAuth2 packages
const { OAuth2Client } = require("google-auth-library");
// const http = require("http");
// const url = require("url");
// const open = require("open");
// const destroyer = require("server-destroy");

const app = express();
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

app.use(cors()); //Middleware setup
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes); // Mount routes

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

//Documentation for your reference for OAuth2 and Google APIs
// Console Cloud Google - https://console.cloud.google.com/
//1. Protocol for OAuth2 - https://developers.google.com/identity/protocols/oauth2
//2. Scopes - define access->user data for Google APIs - https://developers.google.com/identity/protocols/oauth2/scopes
//3. Send access token to an API in a Authorization request header
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

//Download OAuth2 configuration from Google
// const keys = require('./oauth2.keys.json');

// async function main() {
//   const oAuth2Client = await getAutheticatedClient(); // Getting the OAuth2 client
// }
//Need an authorized redirect URL

// 1. Auth service directs to Google OAuth: getting user's email, profile, and openid
app.get("/auth/google", (req, res) => {
  // const authorizeUrl = client.generateAuthUrl({
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });
  // res.redirect(authorizeUrl);
  res.redirect(url);
});

// 2. Google redirects back to auth service
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query; // Code from Google to exchange for tokens
  if (!code) {
    return res.status(401).send("Code not provided");
  }
  try {
    const { tokens } = await client.getToken(code);
    req.session.tokens = tokens;
    res.redirect("http://localhost:5173/musicLibrary");

    // client.setCredentials(tokens);
    //Fetch user info
    // const userInfo = await client.request({
    //   url: "https://www.googleapis.com/oauth2/v2/userinfo",
    // });
    // req.session.tokens = tokens;
    res.json(userInfo.data);
  } catch (error) {
    res.status(500).send("Error during authenticaiton");
  }
});

//Redirect to musicLibrary if user is authenticated
app.get("/musiciLibrary", (req, res) => {
  if (!req.session.tokens) {
    return res.redirect("/auth/google");
  }
});

//Handles user info
app.get("/user", async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).send("User not authenticated");
  }
  client.setCredentials(req.session.tokens);
  const userInfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
  });
  res.send(userInfo.data);
  console.log(userInfo.data);
});
// client.request({ url: "https://www.googleapis.com/oauth2/v2/userinfo" }).then(
//   (response) => {
//     const user = response.data;
//     res.send(user);
//     console.log(user);
//   },
//   (error) => {
//     res.status(500).send("Error fetching user info");
//   }
// );
// }

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

// Test auth service is runing
// app.get("/", (req, res) => {
//   res.send("Auth Service is running.");
// });
