// package imports
const express = require("express");

//function imports
const {
  getAllUsers,
  getUserById,
  register,
  updateAccessOne,
  updateAccessMany,
  registerMany,
  deleteOne,
} = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", register);
router.post("/registerMany", registerMany); //used to populate database with fake users
//TODO: implement login

//protected routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/updateOne", updateAccessOne);
router.post("/updateMany", updateAccessMany);
router.delete("/:id", deleteOne);
//TODO: implement logout

module.exports = router;
