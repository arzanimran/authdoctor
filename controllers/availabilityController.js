


/*const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/slotGenerator");

// get available slots for doctor
exports.getAvailableSlots = async (req, res) => {
  try {

    const { doctorId, date } = req.params;

    // find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({
        message: "Doctor not found",
      });
    }

    // generate all slots
    const allSlots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration
    );

    // get booked appointments
    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      status: "Booked",
    });

    // prepare slot data
    const slots = allSlots.map((slot) => {

      // count booked patients in this slot
      const bookedCount = bookedAppointments.filter(
        (appointment) => appointment.slot === slot
      ).length;

      return {
        slot,
        capacity: doctor.slotCapacity,
        booked: bookedCount,
        remaining: doctor.slotCapacity - bookedCount,
        full: bookedCount >= doctor.slotCapacity,
      };
    });

    res.json({
      doctor: doctor.name,
      specialization: doctor.specialization,
      date,
      slots,
    });

  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
*/

const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Wave = require("../models/Wave");

const generateSlots = require("../utils/slotGenerator");

exports.getAvailableSlots = async (req, res) => {
  try {

    const { doctorId, date } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({
        message: "Doctor not found",
      });
    }

    // get weekday name
    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // 1️⃣ FIRST CHECK NON-RECURRING
    let wave = await Wave.findOne({
      doctorId,
      type: "non-recurring",
      date,
    });

    // 2️⃣ IF NOT FOUND → CHECK RECURRING
    if (!wave) {

      wave = await Wave.findOne({
        doctorId,
        type: "recurring",
        days: dayName,
      });
    }

    if (!wave) {
      return res.json({
        message: "No wave available",
      });
    }

    // generate slots
    const allSlots = generateSlots(
      wave.startTime,
      wave.endTime,
      wave.duration
    );

    // booked appointments
    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      status: "Booked",
    });

    // prepare slots
    const slots = allSlots.map((slot) => {

      const bookedCount = bookedAppointments.filter(
        (appointment) => appointment.slot === slot
      ).length;

      return {
        slot,
        capacity: wave.maxPatients,
        booked: bookedCount,
        remaining: wave.maxPatients - bookedCount,
        full: bookedCount >= wave.maxPatients,
      };
    });

    res.json({
      doctor: doctor.name,
      date,
      waveType: wave.type,
      slots,
    });

  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};