var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;


var uri = 'mongodb://mejor-user:mejorPassword@ds157631.mlab.com:57631/mejor_db';

var app = express();

var _MYPORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var routes = require("./routes/routes.js")(app);
var userRoutes = require("./routes/userRoutes.js")(app);


var server;
//db is defined as global to be used on every routing file
global.db;


// Initialize connection once
MongoClient.connect(uri, function(err, database) {
    if (err) throw err;

    db = database;
    var nodeScheduler = require("./routes/nodeScheduler.js")(app);
    console.log("Mongo db initialization done");

    // Start the application after the database connection is ready
    server = app.listen(_MYPORT, function() {
        console.log("Listening on port %s...", server.address().port);
    });
});