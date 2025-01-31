const express = require("express");
const router = express.Router();

const {
    createSong,
    getSongs
} = require("../controllers/songController");

// Correct: Define a POST route for /song
router.post("/", createSong);
router.get("/", getSongs);

module.exports = router;