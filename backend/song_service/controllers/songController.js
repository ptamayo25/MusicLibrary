const Song = require("../models/song");

exports.createSong = async (req, res) => {
    const { title, composer, arranger, copies, voicing, instrumentation, keywords, lyrics, lastPerformed, comments } = req.body;

    // Validate required fields
    if (!title || !composer) {
        return res.status(400).json({ message: "Title and composer are required" });
    }

    try {
        // Create and save the song
        const song = new Song({
            title,
            composer,
            arranger,
            copies,
            voicing,
            instrumentation,
            keywords,
            lyrics,
            lastPerformed,
            comments,
        });

        await song.save();

        // Return a success response
        res.status(201).json({ message: "Song created successfully", song });
    } catch (error) {

        // Return error response
        res.status(500).json({ message: "Failed to create song", error: error.message });
    }
};

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find()
        res.json({
            songs
        });
    } catch (error) {
        console.error("Error fetching songs:", error); // Detailed error logging
        res.status(500).json({ message: "Failed to fetch songs", error: error.message });
    }
};

const mongoose = require('mongoose');

exports.getSongById = async (req, res) => {
  try {
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "song not found" });
    }

    res.json({ song });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch song", error: error.message });
  }
};

exports.updateSong = async (req, res) => {
    try {
        const { title, composer, arranger, copies, voicing, instrumentation, keywords, lyrics, lastPerformed, comments } = req.body;
        const song = await Song.findById(req.params.id);
        console.log(song);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        // Check current user 
        // if (song.author.toString() !== req.user.id) {
        //     return res.status(403).json({ message: "You are not authorized to update this song" });
        // }

        const updatedData = {};
        if (title) updatedData.title = title;
        if (composer) updatedData.content = composer;
        if (arranger) updatedData.arranger = arranger;
        if (copies) updatedData.copies = copies;
        if (voicing) updatedData.voicing = voicing;
        if (instrumentation) updatedData.instrumentation = instrumentation
        if (keywords) updatedData.keywords = keywords;
        if (lyrics) updatedData.lyrics = lyrics;
        if (keywords) updatedData.keywords = keywords;
        if (lastPerformed) updatedData.lastPerformed = lastPerformed;
        if (comments) updatedData.comments = comments;

        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true, runValidators: true }
        )

        res.status(200).json({ message: "Song updated successfully", song: updatedSong });
    } catch (error) {
        res.status(500).json({ message: "Failed to update song", error: error.message });
    }
};

exports.deleteSong = async (req, res) => {
    try {
      const songId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(songId)) {
        return res.status(400).json({ message: "Invalid song ID" });
      }
  
      const song = await Song.findById(songId);
      console.log(song);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
  
    //   if (song.author.toString() !== req.user.id) {
    //     return res.status(403).json({ message: "You are not authorized to delete this song" });
    //   }
  
  
      // Delete the song
      await song.deleteOne();

      res.status(200).json({ message: "Song and associated data deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete song", error: error.message });
    }
};

