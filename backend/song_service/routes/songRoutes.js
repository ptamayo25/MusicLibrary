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
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

// Correct: Define a POST route for /song
router.post("/", createSong);
router.get("/", getSongs);
router.get("/:id", getSongById);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);

// Route for searching songs
router.post("/search", getSongsBySearch);
router.get("/themes", getThemes);

module.exports = router;
