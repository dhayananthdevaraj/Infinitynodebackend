const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coverImage: {
    type: String, // URL or file path for the cover image
    required: true
  },
  description: {
    type: String
  },
});

const CricketTournament = mongoose.model('CricketTournament', tournamentSchema);

module.exports = CricketTournament;
