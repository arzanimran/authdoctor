const express = require("express");
const router = express.Router();

const {
  getAvailableSlots,
} = require("../controllers/availabilityController");

// GET available slots
router.get("/:doctorId/:date", getAvailableSlots);

module.exports = router;