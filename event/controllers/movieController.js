const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const events = await Event.find({ title: searchRegex }, "-__v").sort({ startDate: parseInt(sortValue) });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id, "-__v");

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  try {
    const createdBy = req.user._id; // Assuming the user ID is available in the request
    const event = await Event.create({ ...req.body, createdBy });
    res.status(200).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json({ message: 'Event updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventsByOrganizerId = async (req, res) => {
  try {
    const organizerId = req.body.organizerId;
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const events = await Event.find({ organizer: organizerId, title: searchRegex }, "-__v")
      .sort({ startDate: parseInt(sortValue) });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsByOrganizerId
};
