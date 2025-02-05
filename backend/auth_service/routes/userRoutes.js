// package imports
const express = require("express");

//function imports
const {
  register,
  updateAccess,
  getAllUsers,
  logoutUser,
  googleAuth,
  googleAuthCallback,
  googleGetUser,
} = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", register);

//login routes
router.get("/login", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/loggedinuser", googleGetUser);

//protected routes
router.post("/updateAccess", updateAccess);
router.get("/getAllUsers", getAllUsers);

//TODO: implement delete user
//TODO: implement logout
// router.post("/logout", logoutUser);

module.exports = router;
