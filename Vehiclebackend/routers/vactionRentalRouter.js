const express = require("express");
const vacationRentalController = require("../controllers/vacationRentalController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllVacationRentals", validateToken, vacationRentalController.getAllVacationRentals);
router.post("/getVacationRentalByUserId", validateToken, vacationRentalController.getVacationRentalsByOwnerId);
router.get("/getVacationRentalById/:id", validateToken, vacationRentalController.getVacationRentalById);
router.post("/addVacationRental", validateToken, vacationRentalController.addVacationRental);
router.put("/updateVacationRental/:id", validateToken, vacationRentalController.updateVacationRental);
router.delete("/deleteVacationRental/:id", validateToken, vacationRentalController.deleteVacationRental);
router.get("/getVacationRentalsByOwnerId/:ownerId", validateToken, vacationRentalController.getVacationRentalsByOwnerId);

module.exports = router;
