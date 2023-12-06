const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  // avatar: {
  //   type: String,
  //   // required: false,
  // },
});

module.exports = mongoose.model("User", userSchema);
