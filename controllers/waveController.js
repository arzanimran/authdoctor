const Wave = require("../models/Wave");

// create recurring wave
exports.createRecurringWave = async (req, res) => {
  try {

    const wave = new Wave({
      ...req.body,
      type: "recurring",
    });

    await wave.save();

    res.json({
      message: "Recurring wave created",
      wave,
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};

// create non recurring wave
exports.createNonRecurringWave = async (req, res) => {
  try {

    const wave = new Wave({
      ...req.body,
      type: "non-recurring",
    });

    await wave.save();

    res.json({
      message: "Non-recurring wave created",
      wave,
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};