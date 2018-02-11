var path = require("path"),
    express = require("express"),
    bodyParser = require('body-parser'),
    winston = require('winston'),
    nodemailer = require('nodemailer');
    mySecret = require('./mySecret');

let pw = mySecret.password(); // val is "pw string"
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('logs', path.join(__dirname, './app_logs'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//configure logger and file path
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'app_logs/logFile.log'
        })
    ]
});

// redirect bootstrap JS, bootstrap CSS & jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
// post route for emailing form
app.post('/email', function(req, res) {
    console.log("POST DATA", req.body);

    var myData = req.body;
    var emailContent = "<b>New form submission</b><h3>From: " + myData.first_name + " " + myData.last_name + "</h3><p>" + myData.first_name + " can be contacted by email at: <b>" + myData.email + " </b> and would like to visit our <b>" + myData.gridRadios + "</b> location.</p>"

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'apikey',
                pass: pw
                // user: account.user, // generated ethereal user
                // pass: account.pass // generated ethereal password
            }
        });

        // setup email data
        let mailOptions = {
            from: '"OCEO Form Submission" <' + myData.email + '>', // sender address
            to: 'rd@rubenduran.net', // list of receivers
            subject: 'OCEO Web Form Submission', // Subject line
            text: 'Hello', // plain text body
            // html: '<b>Hello world</b>' // html body
            html: emailContent // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return logger.log('error', error);
            }
            logger.log('info', 'Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            logger.log('info', 'Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    res.render("thanks", {
        myData: myData
    });
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
