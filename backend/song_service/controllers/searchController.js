const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words } = req.body;

    console.log("request body", req.body);

    if (words === null || !sortType) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    if (words.trim() === "") {
      const allSongs = await Song.find();
      return res.json(sortResults(allSongs, sortType));
    }

    const songsByTitle = await Song.find({
      title: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songByComposer = await Song.find({
      composer: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songsByLyrics = await Song.find({
      lyrics: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songsByKeywords = await Song.find({
      keywords: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songs = [
      ...songsByTitle,
      ...songByComposer,
      ...songsByLyrics,
      ...songsByKeywords,
    ];

    if (songs.length === 0) {
      return [];
    }
    res.json(sortResults(songs, sortType));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 

function sortResults(songs, sortType) {
  switch (sortType) {
    case "composerAtoZ":
      // Sort by composer A to Z
      return songs.sort((a, b) => a.composer.localeCompare(b.composer, undefined, { sensitivity: 'base' }));

    case "composerZtoA":
      // Sort by composer Z to A
      return songs.sort((a, b) => b.composer.localeCompare(a.composer, undefined, { sensitivity: 'base' }));

    case "titleAtoZ":
      // Sort by title A to Z
      return songs.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));

    case "titleZtoA":
      // Sort by title Z to A
      return songs.sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));

    case "mostRecent":
      // Sort by most to least recent performance (descending order)
      return songs.sort((a, b) => new Date(b.datePerformed) - new Date(a.datePerformed));

    case "leastRecent":
      // Sort by least to most recent performance (ascending order)
      return songs.sort((a, b) => new Date(a.datePerformed) - new Date(b.datePerformed));

    default:
      // Return unsorted songs if the sortType is not recognized
      return songs;
  }
}

