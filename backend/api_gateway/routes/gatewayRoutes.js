const express = require("express");
const axios = require("axios");

const router = express.Router();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const SONG_SERVICE_URL = process.env.SONG_SERVICE_URL;

//Song Service Routes
router.use("/songs", async (req, res) => {
  const { method, body, headers, originalUrl } = req;
  const url = `${SONG_SERVICE_URL}${originalUrl}`;

  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers: { Authorization: headers.authorization },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: "Error forwarding request to Song Service",
      error: error.message,
    });
  }
});

module.exports = router;
