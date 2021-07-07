// REQUIRE DEPENDENCIES
var axios = require("axios");
var mongojs = require("mongojs");
var cheerio = require("cheerio");

// DATABASE SETUP
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// ROUTER SETUP
module.exports = function (router) {

    // Route that sends to Index
    router.get("/", function (req, res) {
        res.render("index")
    });

    // Route that shows all scraped data
    router.get("/all", function (req, res) {
        db.scrapedData.find({}, function (error, found) {
            if (error) {
                
                console.log(error);
            }
            else {
                res.json(found);
            }
        });
    });

    router.get("/saved", function (req, res) {
        res.render("saved")
    });


    router.get("/scrape", function(req, res) {
        // Make a request via axios for the news section of `ycombinator`
        axios.get("https://news.ycombinator.com/").then(function(response) {
          // Load the html body from axios into cheerio
          var $ = cheerio.load(response.data);
          // For each element with a "title" class
          $(".title").each(function(i, element) {
            // Save the text and href of each link enclosed in the current element
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");
      
            // If this found element had both a title and a link
            if (title && link) {
              // Insert the data in the scrapedData db
              db.scrapedData.insert({
                title: title,
                link: link
              },
              function(err, inserted) {
                if (err) {
                  // Log the error if one is encountered during the query
                  console.log(err);
                }
                else {
                  // Otherwise, log the inserted data
                  console.log(inserted);
                }
              });
            }
          });
        });
      
        // Send a "Scrape Complete" message to the browser
        res.render("scrape");
      });

}