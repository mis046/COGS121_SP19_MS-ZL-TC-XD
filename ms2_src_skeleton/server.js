// initialize express
const express = require("express");
const app = express();
var path = require("path");

// setup static file location, /static
app.use(express.static("static_files"));

// start sever at http://localhost:3000/
app.listen(3000, () => {
  console.log("Server starts, http://localhost:3000/");
});

app.get('/games', (req, res) => {
  const game_names = Object.keys(fakeDB);
  res.send(fakeDB);
});

app.get('/game_rec', (req,res) => {
  const game1 = Object.keys(fakeDB);
  res.send(fakeDB);
});

//fakeDB
const fakeDB = {
  Pokemon: { age: 10, rating: 8, coverPic: "picture/game_pokemon.jpg"},
  NBA2k: { age: 13, rating: 8.5, coverPic: "picture/game_nba2k.jpg"},
  Sekiro: { age: 17, rating: 9.5, coverPic: "picture/game_sekiro.jpg"}
};