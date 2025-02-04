const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words, themes } = req.body;
    console.log("Request body: ", req.body);

    if (words === null || !sortType || !themes) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    if (words.trim() === "" && themes.length === 0) {
      const allSongs = await Song.find();
      return res.json(sortResults(allSongs, sortType));
    }

    if (words.trim() === "" && themes.length !== 0) {
      const allSongsThemes = await Song.find({
        themes: { $in: themes },
      }).exec();
      return res.json(sortResults(allSongsThemes, sortType));
    }

    const titleQuery =
      themes.length === 0
        ? { title: { $regex: words.trim(), $options: "i" } }
        : {
            title: { $regex: words.trim(), $options: "i" },
            themes: { $in: themes },
          };
    const composerQuery =
      themes.length === 0
        ? {
            composer: { $regex: words.trim(), $options: "i" },
          }
        : {
            composer: { $regex: words.trim(), $options: "i" },
            themes: { $in: themes },
          };
    const lyricsQuery =
      themes.length === 0
        ? {
            lyrics: { $regex: words.trim(), $options: "i" },
          }
        : {
            lyrics: { $regex: words.trim(), $options: "i" },
            themes: { $in: themes },
          };
    const keywordsQuery =
      themes.length === 0
        ? {
            keywords: { $regex: words.trim(), $options: "i" },
          }
        : {
            keywords: { $regex: words.trim(), $options: "i" },
            themes: { $in: themes },
          };

    const songsByTitle = await Song.find(titleQuery).exec();
    const songsByComposer = await Song.find(composerQuery).exec();
    const songsByLyrics = await Song.find(lyricsQuery).exec();
    const songsByKeywords = await Song.find(keywordsQuery).exec();

    const songs = [
      ...songsByTitle,
      ...songsByComposer,
      ...songsByLyrics,
      ...songsByKeywords,
    ];

    if (songs.length === 0) {
      return songs; //return empty array if no songs found
    }
    return res.json(sortResults(songs, sortType));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function sortResults(songs, sortType) {
  switch (sortType) {
    case "composerA-Z":
      console.log("composerA-Z");
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return a.composer.localeCompare(b.composer, undefined, {
          sensitivity: "base",
        });
      });

    case "composerZ-A":
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return b.composer.localeCompare(a.composer, undefined, {
          sensitivity: "base",
        });
      });

    case "titleA-Z":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        console.log("titleA-Z");
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        });
      });

    case "titleZ-A":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        return b.title.localeCompare(a.title, undefined, {
          sensitivity: "base",
        });
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
