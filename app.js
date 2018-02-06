var path = require("path"),
    express = require("express"),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');

var app = express();

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
