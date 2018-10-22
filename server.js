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

//Timestamp servive API
app.get(
  "/api/timestamp/:date_string",
  function(req, res, next) {
    req.time = new Date(req.params.date_string);
    next();
  },
  function(req, res) {
    var date = Date.parse(req.time);
    var dateString = req.params.date_string;
    //if date string use current timestamp
    if (dateString === "") {
      var now = new Date();
      return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }
    //date = number
    if (typeof parseInt(dateString) === "number") {
      var date = new Date(parseInt(dateString));
      return res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
    //if date string is correctly formatted
    else if (typeof date === "number") {
      return res.json({
        unix: req.time.getTime(),
        utc: req.time.toUTCString()
      });
    }
  }
);

// listen for requests :)
var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
