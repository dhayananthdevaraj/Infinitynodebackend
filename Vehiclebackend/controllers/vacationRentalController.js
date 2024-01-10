const VacationRental = require('../models/VacationRentalModel');

const getAllVacationRentals = async (req, res) => {
  try {
    const sortValue = req.query.sortValue || 1; // Default to ascending order if not provided
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    console.log("sortValue", sortValue);

    const vacationRentals = await VacationRental.find({ title: searchRegex }).select('-_id -__v')
      .sort({ pricePerDay: parseInt(sortValue) });

    // console.log("vacationRentals", vacationRentals);
    res.status(200).json(vacationRentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getVacationRentalById = async (req, res) => {
  try {
    const { vacationId } = req.params;
    const vacationRental = await VacationRental.findOne({vacationId}).select('-_id -__v');

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
    console.log("addVacationRental",addVacationRental);
    const vacationRental = await VacationRental.create(req.body);
    res.status(200).json({ message: 'Vacation rental added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVacationRental = async (req, res) => {
  try {
    const { vacationId } = req.params;
    const vacationRental = await VacationRental.findOneAndUpdate({vacationId}, req.body, { new: true });

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
    const { vacationId } = req.params;

    console.log("Id",vacationId);
    const vacationRental = await VacationRental.findOneAndDelete({vacationId});

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
    const {ownerId} = req.params;
    console.log("Own", ownerId);
    const sortValue = req.query.sortValue || 1; // Default to ascending order if not provided
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex
    console.log("sortValue", sortValue);

    const vacationRentals = await VacationRental.find({ userId: ownerId, title: searchRegex }).select('-_id -__v')
      .sort({ pricePerDay: parseInt(sortValue) });

    console.log("vacationRentals", vacationRentals);
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
