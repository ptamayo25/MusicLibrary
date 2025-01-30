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
        console.error("Error fetching posts:", error); // Detailed error logging
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
};