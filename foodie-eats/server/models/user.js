const mongoose = require("mongoose");
// const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: "none"
  },
  bio: {
    type: String,
    default: "This person loves food too much to think of a bio right now!"
  },
  theme: {
    type: String,
    enum: ["honeydew", "shokupan", "boring", "blueberry", "dragonfruit"],
    default: "honeydew"
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: []
  },
  admin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// method for generating a hash; used for password hashing
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// compile the Schema into a Model
const User = mongoose.model("users", userSchema);

module.exports = User;
