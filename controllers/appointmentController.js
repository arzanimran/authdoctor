const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const { patientName, patientPhone, reason } = req.body;

    // find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({
        message: "Doctor not found",
      });
    }

    // today's date
    let currentDate = new Date();

    // allow only next 2 weeks
    const maxDays = 14;

    let appointmentBooked = false;

    // check next available date
    for (let i = 0; i < maxDays; i++) {

      // convert date
      const dateString = currentDate.toISOString().split("T")[0];

      // check sunday
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // skip sunday
      if (dayName === "Sunday") {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      // count booked appointments
      const totalAppointments = await Appointment.countDocuments({
        doctorId,
        date: dateString,
        status: "Booked",
      });

      // max 5 appointments per day
      if (totalAppointments < 5) {

        // create appointment
        const appointment = new Appointment({
          patientName,
          patientPhone,
          reason,
          doctorId,
          date: dateString,
          slot: `Slot-${totalAppointments + 1}`,
          status: "Booked",
        });

        await appointment.save();

        appointmentBooked = true;

        return res.json({
          message: "Appointment booked successfully",
          appointment,
        });
      }

      // move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // no slots available
    if (!appointmentBooked) {
      return res.json({
        message: "No appointment available for next 14 days",
      });
    }

  } catch (err) {
    res.json({
      error: err.message,
    });
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