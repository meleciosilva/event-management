const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: [1, "Cost must equal 1 or more"]
  },
  category: {
    type: String,
    required: true,
    enum: ["business", "casual", "party", "general"]
  },
  capacity: {
    type: Number,
    min: 1
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

