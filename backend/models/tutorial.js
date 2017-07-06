const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
  name: String,
  url: String
});

const Tutorial = mongoose.model('Tutorial', TutorialSchema);

module.exports = Tutorial;
