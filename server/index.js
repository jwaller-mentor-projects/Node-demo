const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let music = [
  {
    title: "Smells Like Teen Spirit",
    id: 0
  },
  {
    title: "Macarena",
    id: 1
  },
  {
    title: "YMCA",
    id: 2
  }
];

let id = 3;

app.get("/api/test", (req, res) => {
  res.status(200).send({ message: "TEST" });
});

app.get("/api/music", (req, res) => {
  res.status(200).send(music);
});

app.get("/api/music/:id", (req, res) => {
  const id = req.params.id;
  let musicIndex = music.findIndex(song => song.id == id);

  if (musicIndex === -1) {
    res.status(403).send({ error: "No music found." });
  } else {
    res.status(200).send(music[musicIndex]);
  }
});

app.post("/api/music", (req, res) => {
  const { title } = req.body;
  let newSong = {
    title,
    id
  };
  id++;

  music.push(newSong);
  res.status(200).send(music);
});

app.delete("/api/music/:id", (req, res) => {
  const { id } = req.params;
  let musicIndex = music.findIndex(song => song.id == id);

  if (musicIndex === -1) {
    res.status(403).send({ error: "No music found." });
  } else {
    music.splice(musicIndex, 1);
    res.status(200).send(music);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
