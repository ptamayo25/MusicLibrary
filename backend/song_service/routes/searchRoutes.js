const express = require("express");
const router = express.Router();

const { getSongsBySearch } = require("../controllers/searchController");

//Add authentication middleware

// Fetch all songs with words in title
router.post("/search/", getSongsBySearch); 

module.exports = router;
