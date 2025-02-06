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

// Correct: Define a POST route for /song
router.post("/", createSong); //added to swagger UI
router.post("/bulkadd", createManySongs); //just used for bulk adding fake songs for testing did not add to swagger UI
router.get("/", getSongs); //added to swagger UI
router.get("/:id", getSongById); //added to swagger UI
router.patch("/:id", updateSong); //added to swagger UI
router.delete("/:id", deleteSong); //added to swagger UI

// Route for searching songs
router.post("/search", getSongsBySearch); //added to swagger UI
router.post("/themes", getThemes); //added to swagger UI

module.exports = router;
