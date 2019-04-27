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

app.get("/child_info", function(req, res) {
  res.sendFile(path.join(__dirname + "/static_files/child_info.html"));
});

app.get("/game_rec", function(req, res) {
  res.sendFile(path.join(__dirname + "/static_files/game_rec.html"));
});

app.get("/game_info", function(req, res) {
  res.sendFile(path.join(__dirname + "/static_files/game_info.html"));
});

app.get("/buy", function(req, res) {
  res.sendFile(path.join(__dirname + "/static_files/buy.html"));
});

//fakeDB
const fakeDB = {
  Pokemon: { age: 10, rating: 8 },
  NBA2k: { age: 13, rating: 8.5 },
  Sekiro: { age: 17, rating: 9.5 }
};