const express = require("express");
const router = express.Router();

//function imports
const { login, logout, callback } = require("../controllers/authController");

//routes
router.get("/login", login);
router.get("/logout", logout);
router.get("/callback", callback);

module.exports = router;
