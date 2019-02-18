const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;