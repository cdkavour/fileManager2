// require middleware
var express = require("express");
var mongoose = require("mongoose");

// require newFile model
var newFile = require("../config/models/newFileModel");

var router = express.Router();


var getShow = router.get("/", function(req, res, next) {

	// Show files
	newFile.find(function (err, allNewFiles) {
		res.send(allNewFiles);
	});

});

// export the show route as an object with a get method
exports.onGet = getShow;