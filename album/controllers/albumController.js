const Album = require('../models/albumModel');

const getAllAlbums = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const albums = await Album.find({ title: searchRegex }, "-__v").sort({ releaseDate: parseInt(sortValue) });

    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id, "-__v");

    if (!album) {
      res.status(404).json({ message: 'Cannot find any album' });
    } else {
      res.status(200).json(album);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAlbum = async (req, res) => {
  try {
    const createdBy = req.user._id; // Assuming the user ID is available in the request
    const album = await Album.create({ ...req.body, createdBy });
    res.status(200).json({ message: 'Album added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndUpdate(id, req.body, { new: true });

    if (!album) {
      res.status(404).json({ message: 'Cannot find any album' });
    } else {
      res.status(200).json({ message: 'Album updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      res.status(404).json({ message: 'Cannot find any album' });
    } else {
      res.status(200).json({ message: 'Album deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAlbumsByCreatorId = async (req, res) => {
  try {
    const creatorId = req.body.creatorId;
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const albums = await Album.find({ createdBy: creatorId, title: searchRegex }, "-__v")
      .sort({ releaseDate: parseInt(sortValue) });

    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumsByCreatorId
};
