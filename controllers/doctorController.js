const Doctor = require("../models/Doctor");

// ---------------- create dr ----------------
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body); //whatever data client sends, we use it to create a doctor in databa

    await doctor.save();// save doctor in database

    res.json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// ---------------- get all dr ----------------
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.json(doctors);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// ---------------- get dr by id ----------------
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.json({ error: err.message });
  }
};