// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

//Timesatmp for empty date string
app.get("/api/timestamp", function(req, res) {
  var now = new Date();
  return res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

//Timestamp servive API
app.get(
  "/api/timestamp/:date_string",
  function(req, res, next) {
    var dateString = req.params.date_string;
    if (Number(dateString)) {
      req.time = new Date(Number(dateString));
    } else {
      req.time = new Date(dateString);
    }
    next();
  },
  function(req, res) {
    var date = req.time;
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
);

// listen for requests :)
var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
