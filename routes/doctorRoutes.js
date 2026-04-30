const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  getDoctorById,
} = require("../controllers/doctorController");

// create doctor
router.post("/", createDoctor);

// get all doctors
router.get("/", getDoctors);

// get doctor by id
router.get("/:id", getDoctorById);

module.exports = router;