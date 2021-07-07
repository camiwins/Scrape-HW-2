// REQUIRE DEPENDENCIES
var express = require("express");
var expressHandlebars = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// PORT SETUP
var PORT = process.env.PORT || 3001;

// INITIATE EXPRESS
var app = express();

// ROUTES SETUP
var router = express.Router();
require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

// HANDLEBARS SETUP
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// USE ROUTER
app.use(router);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// LISTEN ON PORT
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});

