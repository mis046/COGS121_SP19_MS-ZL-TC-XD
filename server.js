// initialize express
const express = require("express");
const app = express();
const axios = require("axios");
var path = require("path");

// initialize firebase db
var firebaseConfig = {
  apiKey: "AIzaSyApxM5dVTvRHjfqNfD5xygT03JzTdyHBhs",
  authDomain: "cogs121proj.firebaseapp.com",
  databaseURL: "https://cogs121proj.firebaseio.com",
  projectId: "cogs121proj",
  storageBucket: "cogs121proj.appspot.com",
  messagingSenderId: "75409493864",
  appId: "1:75409493864:web:03c5b8c4be96c7db"
};
var firebase = require("firebase/app");
require("firebase/database");
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let childInfoQuery = "";
let filterQuery = ""; // games that already been purchased
let childInfo = {};
let currUser = {};

// setup static file location, /static
app.use(express.static("static_files"));

// start sever at http://localhost:3000/
app.listen(process.env.PORT || 3000, () => {
  console.log("Server starts, http://localhost:3000/");
});

// return current login user
app.get("/login", (req, res) => {
  // remove temp user data
  var temp = firebase.database().ref("undefined");
  temp
    .remove()
    .then(function() {
      //console.log("Remove guest user temp insucceeded.");
    })
    .catch(function(error) {
      //console.log("Remove guest user temp failed: " + error.message);
    });
  res.send(currUser);
});

// generate new game
// DONE: add firebase filter games in the data field
// e.g. "& name != "xxx" & name != "xxx""
app.get("/game_rec", (req, res) => {
  let result = "result";

  // build up filter game query
  // current game have a delay to appear on db, so need to be added manually
  let currGame = req.query.name;
  let query = firebase
    .database()
    .ref(currUser.ID + "/")
    .orderByKey();
  query.once("value").then(function(snapshot) {
    filterQuery = "";
    snapshot.child("dislike").forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      let filter_name = childSnapshot.val().name;
      filterQuery += ' & name != "' + filter_name + '"';
    });
    snapshot.child("owned").forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      let filter_name = childSnapshot.val().name;
      filterQuery += ' & name != "' + filter_name + '"';
    });
    snapshot.child("wishlist").forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      let filter_name = childSnapshot.val().name;
      filterQuery += ' & name != "' + filter_name + '"';
    });
  });
  filterQuery += ' & name != "' + currGame + '"';

  // Done: 1. add age filter
  // IGDB [0-5: 2,    6-9: 2/3;    10-12: 2/3/4,    13-16: 2/3/4/5,    17: 2/3/4/5/6,    18: 2/3/4/5/6/7]+5
  // DONE: 2. can retrieve more game details to pass to game_info.html
  // TODO: 3. try to modify the query to get more games, current query will only return around
  // 30 games or less.
  axios({
    url: "https://api-v3.igdb.com/games",
    method: "GET",
    headers: {
      "user-key": "d90ddec63ca35266adbb5eee86e1b822"
    },
    data:
      "sort aggregated_rating desc;fields name,genres.name,aggregated_rating,age_ratings.rating,storyline,summary,screenshots.*,cover.*;" +
      "where aggregated_rating != null" +
      childInfoQuery +
      filterQuery +
      "; limit 1;"
  })
    .then(response => {
      result = response.data; // object result
      //console.log(result); // LOG DATA
      res.send(result[0]);
    })
    .catch(err => {
      console.error(err);
    });
});

// DONE: automatically fill the child info section, pass to child_info
app.get("/child_info", (req, res) => {
  let query = firebase
    .database()
    .ref(currUser.ID + "/")
    .orderByKey();
  query.once("value").then(function(snapshot) {
    res.send(snapshot.child("childInfo").val());
  });
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // hook up with your app

// post childinfo to form part of the query
app.post("/child_info", (req, res) => {
  childInfo = req.body;
  let ageQuery = "( age_ratings.rating = ";
  // make a age query base on age
  let age = childInfo.age;
  if (age >= 18) {
    ageQuery += "(7,8,9,10,11,12) )";
  } else if (age >= 17) {
    ageQuery += "(7,8,9,10,11) )";
  } else if (age >= 13) {
    ageQuery += "(7,8,9,10) )";
  } else if (age >= 10) {
    ageQuery += "(7,8,9) )";
  } else if (age >= 6) {
    ageQuery += "(7,8) )";
  } else {
    ageQuery += "(7) )";
  }

  let genreQuery = " (";
  if (childInfo.genres != undefined) {
    for (const genre of childInfo.genres) {
      genreQuery = genreQuery + ' (genres.name = "' + genre + '") |';
    }
  }
  genreQuery = genreQuery.slice(0, -1);
  genreQuery = genreQuery + ")";
  childInfoQuery =
    "" +
    "& platforms = " +
    childInfo.platform +
    " &" +
    genreQuery +
    " &" +
    ageQuery;
  res.send("successlly get child info");
});
app.post("/login", (req, res) => {
  currUser = req.body;
  res.send(currUser);
});
