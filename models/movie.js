const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
  name: String,
  image: String,
  director: String,
  actor: String,
  actress: String,
  supportingActor: String,
  supportingActress: String
})