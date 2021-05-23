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
  username: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;