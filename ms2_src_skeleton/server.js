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

//fakeDB
const fakeDB = {
  Pokemon: { age: 10, rating: 8 },
  NBA2k: { age: 13, rating: 8.5 },
  Sekiro: { age: 17, rating: 9.5 }
};