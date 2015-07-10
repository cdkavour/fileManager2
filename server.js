// set up ===========================
var express = require("express");
var path	= require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require ("mongoose");
var multer	= require("multer");

var upload = require("./routes/upload");
var show = require("./routes/show");

var db = require("./config/db");

var app = express();

// serve static files -> fileStorage dir
app.use(express.static(path.join(__dirname, 'public')));
app.use("/fileStorage", express.static(__dirname + "/fileStorage"));

// use body parser to get json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use multer to process (multi-part) files
app.use(multer({
  dest: "./fileStorage/",
  rename: function(fieldname, filename) {
    return filename.replace(/\W+/g, "-").toLowerCase();
  }
}));

// database configuration

	// Connect to the local database 'mydb'
	mongoose.connect(db.url);

	// Bind errors
	mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// server-side routes

// upload
app.use("/upload", upload.onGet);
app.use("/show", show.onGet);

// rendering the main view for now - angular takes over
app.get("*", function(req, res) {
	res.render("./public/index.html");
});

app.listen(2000);
console.log("---app listening on port 2000---");
