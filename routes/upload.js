// require middleware
var express = require("express");
var mongoose = require("mongoose");

// require newFile model
var newFile = require("../config/models/newFileModel");

var router = express.Router();


var getUpload = router.post('/', function(req, res, next) {

	console.log(req.body);
	console.log(req.files);

	// add file to database
	var newUpload = new newFile({ 
		name: req.files.upload.name,
		size: req.files.upload.size,
		path: req.files.upload.path,
		type: req.files.upload.mimetype
	});
	newUpload.save();

	// display file
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("received file:<br/>");

	var filepath = '/fileStorage/' + req.files.upload.name;
	res.write("<img src='" + filepath + "'/>");

	res.end();
});

// export the upload route as an object with a get method
exports.onGet = getUpload;
