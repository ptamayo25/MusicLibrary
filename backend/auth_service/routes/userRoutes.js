// package imports
const express = require("express");

//function imports
const {
  register,
  updateAccessOne,
  updateAccessMany,
} = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", register);
//TODO: implement login

//protected routes
router.post("/updateOne", updateAccessOne);
//TODO: implement delete user
//TODO: implement logout
router.post("/updateMany", updateAccessMany);

module.exports = router;
