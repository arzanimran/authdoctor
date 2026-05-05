const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const generateSlots = require("../utils/slotGenerator");

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

    // next 14 days
    const maxDays = 14;

    // check dates
    for (let i = 0; i < maxDays; i++) {

      // convert date
      const dateString = currentDate.toISOString().split("T")[0];

      // get day name
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // skip sunday
      if (dayName === "Sunday") {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      // generate all slots
      const allSlots = generateSlots(
        doctor.startTime,
        doctor.endTime,
        doctor.slotDuration
      );

      // check every slot
      for (const slot of allSlots) {

        // count already booked patients in this slot
        const bookedCount = await Appointment.countDocuments({
          doctorId,
          date: dateString,
          slot,
          status: "Booked",
        });

        // if slot available
        if (bookedCount < doctor.slotCapacity) {

          // create appointment
          const appointment = new Appointment({
            patientName,
            patientPhone,
            reason,
            doctorId,
            date: dateString,
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

      // move next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // no slots available
    res.json({
      message: "No slots available for next 14 days",
    });

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
