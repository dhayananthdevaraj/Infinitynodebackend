const express = require("express");
const movieController = require("../controllers/movieController"); // Fix the import statement
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllMovies", movieController.getAllMovies);
router.post("/getMoviesByCreatorId", movieController.getMoviesByCreatorId);
router.get("/getMovieById/:id", movieController.getMovieById);
router.post("/addMovie", movieController.addMovie);
router.put("/updateMovie/:id", movieController.updateMovie);
router.delete("/deleteMovie/:id", movieController.deleteMovie);

module.exports = router;
