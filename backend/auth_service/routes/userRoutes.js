// package imports
const express = require("express");

//function imports
const {
  getAllUsers,
  getUserById,
  // register,
  updateAccessOne,
  updateAccessMany,
  registerMany,
  deleteOne,
} = require("../controllers/userController");

//middleware imports
const { verifyJWT } = require("../middlewares/verifyJWT");

const { checkAdmin } = require("../middlewares/checkUserAccess");

const router = express.Router();

//public routes
// router.post("/register", register);
router.post("/registerMany", registerMany); //used to populate database with fake users
//TODO: implement login
//TODO: implement logout

//protected routes
router.get("/", verifyJWT, checkAdmin, getAllUsers);
router.get("/:id", verifyJWT, checkAdmin, getUserById);
router.delete("/:id", verifyJWT, checkAdmin, deleteOne);
router.patch("/updateAccessOne", verifyJWT, checkAdmin, updateAccessOne);
router.patch("/updateAccessMany", verifyJWT, checkAdmin, updateAccessMany);

module.exports = router;
