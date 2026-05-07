const mongoose = require("mongoose");

const waveSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  type: {
    type: String,
    enum: ["recurring", "non-recurring"],
    required: true,
  },

  // recurring only
  days: [String],

  // non recurring only
  date: String,

  startTime: String,
  endTime: String,

  duration: Number,

  maxPatients: Number,
});

module.exports = mongoose.model("Wave", waveSchema);