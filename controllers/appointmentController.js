const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const generateSlots = require("../utils/slotGenerator");

// create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    const { patientName, patientPhone, reason } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({ message: "Doctor not found" });
    }

    const allSlots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration
    );

    for (const slot of allSlots) {

      const bookedCount = await Appointment.countDocuments({
        doctorId,
        date,
        slot,
        status: "Booked",
      });

      if (bookedCount < doctor.slotCapacity) {

        const appointment = new Appointment({
          patientName,
          patientPhone,
          reason,
          doctorId,
          date,
          slot,
          status: "Booked",
        });

        await appointment.save();

        return res.json({
          message: "Appointment booked successfully",
          appointment,
        });
      }
    }

    res.json({
      message: "No slots available for selected date",
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};

// cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.json({
        message: "Appointment not found",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });

  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
