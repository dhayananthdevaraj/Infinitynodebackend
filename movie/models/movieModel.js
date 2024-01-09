const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  coverImage: {
    type: String, // URL or file path for the movie poster
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
