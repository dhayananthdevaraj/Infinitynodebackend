const mongoose = require('mongoose');

const vacationRentalSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vacationId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId, // Auto-generate ObjectId for vacationId
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  noOfBedroom: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
  },
  location: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const VacationRental = mongoose.model('VacationRental', vacationRentalSchema);

module.exports = VacationRental;
