// initialize express
const express = require('express');
const app = express();

// setup static file location, /static
app.use(express.static('static'));

// start sever at http://localhost:3000/
app.listen(3000, () => {
    console.log("Server start, localhost:3000");
});