const mongoose = require("mongoose");

const facilatatorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  facilitatorRole: {
    type: String,
    required: true,
  },
  sportsEvent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Facilatator", facilatatorSchema);
