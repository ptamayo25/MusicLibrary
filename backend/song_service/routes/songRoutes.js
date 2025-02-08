const express = require("express");
const router = express.Router();

// Import the searchSongs function from the searchController
const {
  getSongsBySearch,
  getThemes,
} = require("../controllers/searchController");

//Import CRTUD functions from songController
const {
  createSong,
  createManySongs,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

const verifyJWT = require("..//middlewares/verifyJWT");
const checkSubadmin = require("../middlewares/checkSubadmin");

// Correct: Define a POST route for /song
router.post("/", verifyJWT, checkSubadmin, createSong); //added to swagger UI
// router.post("/bulkadd", createManySongs); //just used for bulk adding fake songs for testing did not add to swagger UI
router.get("/", verifyJWT, getSongs); //added to swagger UI
router.get("/:id", verifyJWT, getSongById); //added to swagger UI
router.patch("/:id", verifyJWT, checkSubadmin, updateSong); //added to swagger UI
router.delete("/:id", verifyJWT, checkSubadmin, deleteSong); //added to swagger UI

// Route for searching songs
router.post("/search", verifyJWT, getSongsBySearch); //added to swagger UI
router.post("/themes", verifyJWT, getThemes); //added to swagger UI

module.exports = router;
