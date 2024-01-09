const express = require("express");
const cricketTournamentController = require("../controllers/cricketTournamentController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllCricketTournaments", cricketTournamentController.getAllCricketTournaments);
router.post("/getCricketTournamentsByOrganizerId", cricketTournamentController.getCricketTournamentsByOrganizerId);
router.get("/getCricketTournamentById/:id", cricketTournamentController.getCricketTournamentById);
router.post("/addCricketTournament", cricketTournamentController.addCricketTournament);
router.put("/updateCricketTournament/:id", cricketTournamentController.updateCricketTournament);
router.delete("/deleteCricketTournament/:id", cricketTournamentController.deleteCricketTournament);

module.exports = router;
