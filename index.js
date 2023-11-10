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
  let date = req.params;
  let nDate = new Date(date.date)
  let ts = Date.parse(date.date)
  if (!date.date) {
    let date = new Date()
    return res.json({ unix: timestamp.now(), utc: date.toUTCString() })
  } else if (date.date.length>10) {
    let ts = timestamp.toDate(parseInt(date.date))
    return res.json({ unix: parseInt(date.date), utc: ts.toUTCString() })
  } else {
    let tstamp = timestamp.fromDate(date.date)
    console.log(tstamp)
    if (isNaN(tstamp)) {
      return res.json({ error: "Invalid Date" })
    }
    return res.json({ unix: tstamp, utc: `${nDate.toUTCString()}` })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
