const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/oscar-party"), { useNewUrlParser: true };

module.exports.Category = require("./category");
module.exports.Movie = require("./movie");