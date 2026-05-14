let express = require('express');
let app = express();
console.log("Hello World");
require('dotenv').config();

app.get("/name", function(req, res) {
  var { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}`});
});

app.get("/:word/echo", function(req, res) {
  var word = req.params.word;
  var {word, echo} = req.params;
  res.json({echo: word});
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/json", function(req, res) {
  // app.use(express.static(__dirname + "/public"));
  // res.sendFile(__dirname + "/views/index.html");
  // res.send("Hello Express");
  
  var resp = "Hello json".toUpperCase();
  if (process.env.MESSAGE_STYLE === "uppercase") {
    resp = "Hello json".toUpperCase();
  } else {
    resp = "Hello json";
  }
  res.json({
    "message": resp
  });
});




 module.exports = app;
