// package imports
const express = require("express");

//function imports
const { register, updateAccess } = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", register);
//TODO: implement login

//protected routes
router.post("/updateAccess", updateAccess);
//TODO: implement delete user
//TODO: implement logout

module.exports = router;
