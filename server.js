// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Parse URL from request
app.use(bodyParser.urlencoded({extended: false}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp API
app.get('/api/timestamp/:date_string?', (req, res) => {
  var dateString = req.params.date_string;
  var date, utc, unix;
  
  if(!dateString){
    utc = new Date();
    unix = utc.getTime();
    return res.json({
      "unix": unix,
      "utc": utc
    });
  }
  
  if(/\d{10}/.test(dateString)){
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }
  
  unix = date.getTime();
  utc = new Date(date).toUTCString();
  var response = {
    "unix": unix,
    "utc": utc
  }
  res.json(response);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});