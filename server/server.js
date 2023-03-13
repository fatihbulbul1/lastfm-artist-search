require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const options = ["Manga", "Imagine Dragons", "Sia"];

app.post("/artists", async function (req, res) {
  const artist = req.body.artist;
  const api_key = process.env.API_KEY;
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${api_key}&format=json`
  );
  const data = await response.json();
  if (data.results.artistmatches.artist.length === 0) {
    const randomIndex = Math.floor(Math.random() * 3);
    const newResponse = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${options[randomIndex]}&api_key=${api_key}&format=json`
    );
    const newData = await newResponse.json();
    res.json({ data: newData.results, random: true });
  } else res.json({ data: data.results, random: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
