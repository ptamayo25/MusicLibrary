const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words } = req.body;
    console.log("Received sortType:", sortType);
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
    const songsByComposer = await Song.find({
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
      ...songsByComposer,
      ...songsByLyrics,
      ...songsByKeywords,
    ];

    if (songs.length === 0) {
      return [];
    }
    console.log(`sortType = ${sortType}`);
    res.json(sortResults(songs, sortType));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


function sortResults(songs, sortType) {
  switch (sortType) {
    case "composerA-Z":
      console.log("composerA-Z")
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return a.composer.localeCompare(b.composer, undefined, { sensitivity: 'base' });
      });

    case "composerZ-A":
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return b.composer.localeCompare(a.composer, undefined, { sensitivity: 'base' });
      });

    case "titleA-Z":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        console.log("titleA-Z")
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      });

    case "titleZ-A":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        return b.title.localeCompare(a.title, undefined, { sensitivity: 'base' });
      });

    case "mostRecent":
      return songs.sort((a, b) => {
        if (!a.lastPerformed) return 1;
        if (!b.lastPerformed) return -1;
        return new Date(b.lastPerformed) - new Date(a.lastPerformed);
      });

      case "leastRecent":
        return songs.sort((a, b) => {
          if (!a.lastPerformed) return 1;
          if (!b.lastPerformed) return -1;
          return new Date(a.lastPerformed) - new Date(b.lastPerformed);
        });

    default:
      return songs;
  }
}

