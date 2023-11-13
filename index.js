// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express');
var app = express();
const timestamp = require('unix-timestamp');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let nDate = new Date(date)
  let regex = /^\d+$/
  if (!date) {
    let date = new Date()
    return res.json({ unix: Math.floor(new Date().getTime() / 1000), utc: date.toUTCString() })
  }

  if (regex.test(date)) {
    let ts = new Date(parseInt(date)).toUTCString()
    return res.json({ unix: parseInt(date), utc: ts })
  }

  if (nDate != "Invalid Date") {
    let ts = Math.floor(new Date(date).getTime())
    console.log(ts)
    return res.json({ unix: ts, utc: nDate.toUTCString() })
  }
  return res.json({ error: 'Invalid Date' })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
