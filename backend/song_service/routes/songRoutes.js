const express = require("express");
const router = express.Router();

const {
    createSong,
    getSongs,
    getSongById,
    updateSong,
    deleteSong
} = require("../controllers/songController");

// Correct: Define a POST route for /song
router.post("/", createSong);
router.get("/", getSongs);
router.get("/:id", getSongById);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);

module.exports = router;

