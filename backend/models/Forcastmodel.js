const mongoose = require("mongoose");

const forcastSchema = mongoose.Schema({
  project_id: { type: String, required: true },
  forecastData: { type: Array, required: true },
  r2Values: { type: Array, required: true },
});

const Forcast = mongoose.model("Forcast", forcastSchema);

module.exports = Forcast;