// initialize express
const express = require('express');
const app = express();

// setup static file location, /static
app.use(express.static('static_files'));

// start sever at http://localhost:3000/
app.listen(3000, () => {
    console.log("Server starts, http://localhost:3000/");
});
