const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
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
    lowerCase: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["regular", "admin"],
    default: "regular"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;