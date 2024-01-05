const VacationRental = require('../models/VacationRentalModel');

const getAllVacationRentals = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex
console.log("sortValue",sortValue);
    const vacationRentals = await VacationRental.find({ title: searchRegex }).sort({ pricePerDay: parseInt(sortValue) });

// console.log("vacationRentals",valcationRentals);
    res.status(200).json(vacationRentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVacationRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const vacationRental = await VacationRental.findById(id);

    if (!vacationRental) {
      res.status(404).json({ message: 'Cannot find any vacation rental' });
    } else {
      res.status(200).json(vacationRental);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVacationRental = async (req, res) => {
  try {
    const vacationRental = await VacationRental.create(req.body);
    res.status(200).json({ message: 'Vacation rental added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVacationRental = async (req, res) => {
  try {
    const { id } = req.params;
    const vacationRental = await VacationRental.findByIdAndUpdate(id, req.body, { new: true });

    if (!vacationRental) {
      res.status(404).json({ message: 'Cannot find any vacation rental' });
    } else {
      res.status(200).json({ message: 'Vacation rental updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVacationRental = async (req, res) => {
  try {
    const { id } = req.params;
    const vacationRental = await VacationRental.findByIdAndDelete(id);

    if (!vacationRental) {
      res.status(404).json({ message: 'Cannot find any vacation rental' });
    } else {
      res.status(200).json({ message: 'Vacation rental deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVacationRentalsByOwnerId = async (req, res) => {
  try {
    const ownerId  = req.body.ownerId;
    // console.log("Own",ownerId);
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex
    console.log("sortValue",sortValue);
    const vacationRentals = await VacationRental.find({ owner: ownerId, title: searchRegex }).sort({ pricePerDay: parseInt(sortValue) });
// console.log("vacationRentals",vacationRentals);
    res.status(200).json(vacationRentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllVacationRentals,
  getVacationRentalById,
  addVacationRental,
  updateVacationRental,
  deleteVacationRental,
  getVacationRentalsByOwnerId
};
