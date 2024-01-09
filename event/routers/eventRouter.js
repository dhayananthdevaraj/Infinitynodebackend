const express = require("express");
const eventController = require("../controllers/eventController"); // Fix the import statement
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllEvents", eventController.getAllEvents);
router.post("/getEventsByOrganizerId", eventController.getEventsByOrganizerId);
router.get("/getEventById/:id", eventController.getEventById);
router.post("/addEvent", eventController.addEvent);
router.put("/updateEvent/:id", eventController.updateEvent);
router.delete("/deleteEvent/:id", eventController.deleteEvent);

module.exports = router;
