// initialize express
const express = require("express");
const app = express();
const axios = require('axios');
var path = require("path");

let childInfoQuery = "";
let filterQuery = ""; // games that already been purchased
let childInfo = {};


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

// generate new game 
// TODO: add firebase filter games in the data field
// e.g. "& name != "xxx" & name != "xxx""
app.get('/game_rec', (req,res) => {
  let result = "result";
  axios({
    url: "https://api-v3.igdb.com/games",
    method: 'GET',
    headers: {
        'user-key': 'd90ddec63ca35266adbb5eee86e1b822'
    },
    data: "sort aggregated_rating desc;fields name,genres.name,aggregated_rating,age_ratings.rating,storyline,summary,cover.*;" 
    + "where aggregated_rating != null & rating_count > 5 " + childInfoQuery + "; limit 5;"
  })
    .then(response => {
        result = response.data; // object result 
        //console.log(result);
        res.send(result);   
    })
    .catch(err => {
        console.error(err);
    });
  //const game1 = Object.keys(fakeDB);
  //res.send(result);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app

// post childinfo to form part of the query  
app.post('/game_rec', (req,res) => {
  childInfo = req.body;
  let genreQuery = " (";
  for(const genre of childInfo.genres) {
    genreQuery = genreQuery + ' (genres.name = "' + genre + '") |';
  }
  genreQuery = genreQuery.slice(0, -1);
  genreQuery = genreQuery + ")";
  childInfoQuery = "" + "& platforms = " + childInfo.platform + " &" + genreQuery;
  console.log(childInfoQuery);
  res.send("success");
  // STORE THE DATA TO DB 
});

//fakeDB
const fakeDB = {
  Pokemon: { age: 10, rating: 8, coverPic: "picture/game_pokemon.jpg"},
  NBA2k: { age: 13, rating: 8.5, coverPic: "picture/game_nba2k.jpg"},
  Sekiro: { age: 17, rating: 9.5, coverPic: "picture/game_sekiro.jpg"}
};