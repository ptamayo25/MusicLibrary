const express = require("express");
const router = express.Router();

const {
  getSongsByTitle,
  getSongsByComposer,
  getSongsByLyrics,
  getSongsByKeywords,
} = require("../controllers/searchController");

//Add authentication middleware

// Fetch all songs with words in title
router.get("/title/:wordsInTitle", getSongsByTitle);

// Fetch all songs by a specific composer
router.get("/composer/:composer", getSongsByComposer);

// Fetch all songs with words in lyrics
router.get("/lyrics/:wordsInLyrics", getSongsByLyrics);

// Fetch all songs with words in keywords
router.get("/keywords/:words", getSongsByKeywords);
