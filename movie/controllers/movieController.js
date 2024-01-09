const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const movies = await Movie.find({ title: searchRegex }, "-__v").sort({ releaseDate: parseInt(sortValue) });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id, "-__v");

    if (!movie) {
      res.status(404).json({ message: 'Cannot find any movie' });
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const createdBy = req.user._id; // Assuming the user ID is available in the request
    const movie = await Movie.create({ ...req.body, createdBy });
    res.status(200).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

    if (!movie) {
      res.status(404).json({ message: 'Cannot find any movie' });
    } else {
      res.status(200).json({ message: 'Movie updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      res.status(404).json({ message: 'Cannot find any movie' });
    } else {
      res.status(200).json({ message: 'Movie deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMoviesByCreatorId = async (req, res) => {
  try {
    const creatorId = req.body.creatorId;
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const movies = await Movie.find({ createdBy: creatorId, title: searchRegex }, "-__v")
      .sort({ releaseDate: parseInt(sortValue) });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  getMoviesByCreatorId
};
