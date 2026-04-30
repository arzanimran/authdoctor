// generate time slots based on start, end, duration

function generateSlots(startTime, endTime, duration) {
  const slots = [];

  // split time
  let [startHour, startMin] = startTime.split(":").map(Number);
  let [endHour, endMin] = endTime.split(":").map(Number);

  let start = new Date();
  start.setHours(startHour, startMin, 0);

  let end = new Date();
  end.setHours(endHour, endMin, 0);

  // loop until end time
  while (start < end) {   //Keep running until time reaches end
    const time =
      String(start.getHours()).padStart(2, "0") +  // padStart look like in two digit only
      ":" +
      String(start.getMinutes()).padStart(2, "0");

    slots.push(time);

    // move to next slot
    start.setMinutes(start.getMinutes() + duration);   // move to next slot by adding duration
  }

  return slots;
}

module.exports = generateSlots;