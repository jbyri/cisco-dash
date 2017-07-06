const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/custom-react-boilerplate");

module.exports.Tutorial = require("./tutorial.js");
module.exports.User = require("./user.js");
