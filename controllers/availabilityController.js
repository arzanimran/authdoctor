const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/slotGenerator");

// get available slots for a doctor on a specific date
exports.getAvailableSlots = async (req, res) => { //this function will handle API request for available slots
  try {
    const { doctorId, date } = req.params;// get doctor id and date from request parameters

    // find doctor
    const doctor = await Doctor.findById(doctorId);// find doctor in database using doctor id

    if (!doctor) {
      return res.json({ message: "Doctor not found" });
    }

    // generate all slots
    const allSlots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration
    );// generate all possible slots for the doctor based on start time, end time and slot duration

    // get booked appointments
    const booked = await Appointment.find({
      doctorId,
      date,
      status: "Booked",
    });

    const bookedSlots = booked.map((a) => a.slot);

    // remove booked slots
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({
      doctor: doctor.name,
      date,
      totalSlots: allSlots.length,
      bookedSlots: bookedSlots.length,
      availableSlots,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};