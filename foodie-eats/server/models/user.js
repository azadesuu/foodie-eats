// model for the snack collection defined here
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true
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
  profile_image: {
    type: String,
    default: "none"
  },
  theme : {
    type: String,
    enum: ["honeydew","shokupan","boring","blueberry","dragonfruit"],
    default: "honeydew",
    required: true
  },
  bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      required: true
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

// // method for generating a hash; used for password hashing
// userSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// };

// // checks if password is valid
// userSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// compile the Schema into a Model
const User = mongoose.model("users", userSchema);

module.exports = User;
