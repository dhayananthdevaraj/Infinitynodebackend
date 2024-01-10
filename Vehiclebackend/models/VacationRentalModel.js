// Example model for a vacation rental property

const mongoose = require('mongoose'); // Example for MongoDB with Mongoose

const vacationRentalSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the property owner
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    enum: ['House', 'Apartment', 'Villa', 'Cabin', 'Condo', 'Other'],
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String] // An array of strings representing amenities
  },
  location: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true

     // An array of strings representing photo URLs
  },

});

const VacationRental = mongoose.model('VacationRental', vacationRentalSchema);

module.exports = VacationRental;
