const express = require("express");
const router = express.Router();

//function imports
const {
  login,
  logout,
  callback,
  success,
  failed,
} = require("../controllers/authController");

//routes
router.get("/login", login);
router.get("/logout", logout);
router.get("/google/callback", callback);
router.get("/failed", failed);
router.get("/success", success);

module.exports = router;
