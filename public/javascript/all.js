var mongojs = require("mongojs");

// DATABASE SETUP
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});


db.scrapedData.find({}, function (error, found) {
    res.json(found);
});