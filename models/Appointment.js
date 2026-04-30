const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientPhone: String,
  patientName: String,
  reason: String,

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  date: String,
  slot: String,

  status: {
    type: String,
    default: "Booked",
  },
});

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);