const express = require("express");

const router = express.Router();

const {
  createAppointment,
  cancelAppointment,
} = require("../controllers/appointmentController");


// create appointment
router.post("/:doctorId/:date", createAppointment);;


// cancel appointment
router.put("/cancel/:id", cancelAppointment);

module.exports = router;
