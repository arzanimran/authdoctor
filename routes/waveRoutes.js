const express = require("express");

const router = express.Router();

const {
  createRecurringWave,
  createNonRecurringWave,
} = require("../controllers/waveController");

// recurring
router.post("/recurring", createRecurringWave);

// non recurring
router.post("/non-recurring", createNonRecurringWave);

module.exports = router;