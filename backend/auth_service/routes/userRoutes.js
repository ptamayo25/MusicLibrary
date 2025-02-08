// package imports
const express = require("express");

//function imports
const {
  getAllUsers,
  getUserById,
  updateAccessOne,
  updateAccessMany,
  // registerMany,
  deleteOne,
} = require("../controllers/userController");

//middleware imports
const verifyJWT = require("../middlewares/verifyJWT");

const { checkAdmin } = require("../middlewares/checkUserAccess");

const router = express.Router();

//public routes
// router.post("/register", register); //now only used in auth/google/callback
// router.post("/registerMany", registerMany); //used to populate database with fake users

//protected routes
router.get("/", verifyJWT, checkAdmin, getAllUsers);
router.get("/:id", verifyJWT, checkAdmin, getUserById);
router.delete("/:id", verifyJWT, checkAdmin, deleteOne);
router.post("/updateOne", verifyJWT, checkAdmin, updateAccessOne);
router.post("/updateMany", verifyJWT, checkAdmin, updateAccessMany);

module.exports = router;
