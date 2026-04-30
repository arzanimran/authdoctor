const mongoose = require("mongoose");

// User schema (patient or doctor)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // role system
  role: {
    type: String,
    enum: ["patient", "doctor"],
    default: "patient",
  },
});

module.exports = mongoose.model("User", userSchema);