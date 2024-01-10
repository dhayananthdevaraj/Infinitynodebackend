const express = require("express");
const vacationRentalController = require("../controllers/vacationRentalController");
const { validateToken } = require("../authUtils");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/vacation",   vacationRentalController.getAllVacationRentals);
router.get("/vacation/ownerId/:ownerId",   vacationRentalController.getVacationRentalsByOwnerId);
router.get("/vacation/:vacationId",   vacationRentalController.getVacationRentalById);
router.post("/vacation",   vacationRentalController.addVacationRental);
router.put("/vacation/:vacationId",   vacationRentalController.updateVacationRental);
router.delete("/vacation/:vacationId",   vacationRentalController.deleteVacationRental);
router.get('/users',userController.getAllUsers);

module.exports = router;
