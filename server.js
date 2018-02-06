
// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/result', function(req, res) {
 console.log("POST DATA", req.body);
 var myData = req.body;

 res.render("results", {myData:myData});
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});

// var path = require('path'),
//     express = require('express'),
//     mongoose = require('mongoose'),
//     bodyParser = require('body-parser'),
//     session = require('express-session');
//
// var app = express();
//
// var sessionConfig = {
//     secret: 'SecretKey', // Secret name for decoding secret and such
//     resave: false, // Don't resave session if no changes were made
//     saveUninitialized: true, // Don't save session if there was nothing initialized
//     name: 'myCookie', // Sets a custom cookie name
//     cookie: {
//         secure: false, // This need to be true, but only on HTTPS
//         httpOnly: false, // Forces cookies to only be used over http
//         maxAge: 3600000
//     }
// };
//
// app.use(session(sessionConfig));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json({
//     extended: true
// }));
//
// // app.use(express.static(path.join(__dirname, "QandA", "dist")));
// //
// // require('./server/config/mongoose.js');
// // require('./server/config/routes.js')(app);
//
// app.listen(8000, function() {
//     console.log("listening on port 8000");
// })
