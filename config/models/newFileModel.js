var mongoose = require("mongoose");

console.log("define 'upload' schema");

var uploadSchema = mongoose.Schema({
  name: String,
  size: Number,
  path: String,
  type: String
});

module.exports = mongoose.model("newFile", uploadSchema);