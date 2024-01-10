const express = require("express");
const vacationRentalController = require("../controllers/vacationRentalController");
const { validateToken } = require("../authUtils");
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/vacation",   vacationRentalController.getAllVacationRentals);
router.post("/vacation/owner",   vacationRentalController.getVacationRentalsByOwnerId);
router.get("/vacation/:vacationId",   vacationRentalController.getVacationRentalById);
router.post("/vacation/addVacation",   vacationRentalController.addVacationRental);
router.put("/vacation/:vacationId",   vacationRentalController.updateVacationRental);
router.delete("/vacation/:vacationId",   vacationRentalController.deleteVacationRental);
router.get('/users',userController.getAllUsers);

module.exports = router;
