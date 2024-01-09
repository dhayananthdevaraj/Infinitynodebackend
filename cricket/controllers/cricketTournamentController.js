const CricketTournament = require('../models/CricketTournamentModel');

const getAllCricketTournaments = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const cricketTournaments = await CricketTournament.find({ name: searchRegex }, "-__v").sort({ startDate: parseInt(sortValue) });

    res.status(200).json(cricketTournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCricketTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const cricketTournament = await CricketTournament.findById(id, "-__v");

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json(cricketTournament);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCricketTournament = async (req, res) => {
  try {
    const cricketTournament = await CricketTournament.create(req.body);
    res.status(200).json({ message: 'Cricket tournament added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCricketTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const cricketTournament = await CricketTournament.findByIdAndUpdate(id, req.body, { new: true });

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json({ message: 'Cricket tournament updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCricketTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const cricketTournament = await CricketTournament.findByIdAndDelete(id);

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json({ message: 'Cricket tournament deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCricketTournamentsByOrganizerId = async (req, res) => {
  try {
    const organizerId = req.body.organizerId;
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const cricketTournaments = await CricketTournament.find({ organizer: organizerId, name: searchRegex }, "-__v")
      .sort({ startDate: parseInt(sortValue) });

    res.status(200).json(cricketTournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllCricketTournaments,
  getCricketTournamentById,
  addCricketTournament,
  updateCricketTournament,
  deleteCricketTournament,
  getCricketTournamentsByOrganizerId
};
