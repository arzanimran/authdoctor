/*const mongoose = require("mongoose");

// Doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  specialization: String,

  // working days
  availableDays: {
    type: [String],
    default: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },

  // working hours
  startTime: {
    type: String,
    default: "09:00",
  },

  endTime: {
    type: String,
    default: "17:00",
  },

  // slot duration (for future PR)
  slotDuration: {
    type: Number,
    default: 15,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
*/


const mongoose = require("mongoose");

// Doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  specialization: String,

  // working days
  availableDays: {
    type: [String],
    default: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },

  // working hours
  startTime: {
    type: String,
    default: "09:00",
  },

  endTime: {
    type: String,
    default: "17:00",
  },

  // slot duration
  slotDuration: {
    type: Number,
    default: 30,
  },

  // NEW → max patients per slot
  slotCapacity: {
    type: Number,
    default: 4,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);

