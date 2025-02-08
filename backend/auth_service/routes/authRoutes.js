const express = require("express");
const router = express.Router();

//function imports
const {
  login,
  logout,
  callback,
  failed,
} = require("../controllers/authController");

const { verifyJWT } = require("../middlewares/verifyJWT");

//routes
router.get("/login", login);
router.get("/google/callback", callback);
router.get("/failed", failed);

//protected routes
router.get("/logout", verifyJWT, logout);

module.exports = router;
