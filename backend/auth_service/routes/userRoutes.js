// package imports
const express = require("express");

//function imports
const {
  register,
  updateAccess,
  getAllUsers,
  logoutUser,
  loggedIn,
  // googleLogin,
  // googleAuth,
  // googleGetUser,
} = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", register);

//login
// router.get("/")
// router.get("/loggedIn", loggedIn);
// router.get("/login", googleLogin);
// router.get("/auth/google", googleAuth);
// router.get("/auth/loggedin", googleGetUser);

//protected routes
router.post("/updateAccess", updateAccess);
router.get("/getAllUsers", getAllUsers);

//TODO: implement delete user
//TODO: implement logout
// router.post("/logout", logoutUser);

module.exports = router;
