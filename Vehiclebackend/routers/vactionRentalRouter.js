const express = require("express");
const vacationRentalController = require("../controllers/vacationRentalController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllVacationRentals",   vacationRentalController.getAllVacationRentals);
router.post("/getVacationRentalByOwnerId",   vacationRentalController.getVacationRentalsByOwnerId);
router.get("/getVacationRentalById/:id",   vacationRentalController.getVacationRentalById);
router.post("/addVacationRental",   vacationRentalController.addVacationRental);
router.put("/updateVacationRental/:id",   vacationRentalController.updateVacationRental);
router.delete("/deleteVacationRental/:id",   vacationRentalController.deleteVacationRental);

module.exports = router;
