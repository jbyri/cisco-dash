// jshint esversion : 6
// 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cisco-dash");

module.exports.User = require("./user.js");
