const mongoose = require("mongoose");

// Unit tests
//Register
exports.newUser = {
  username: "azadesuu",
  email: "azadesuu@gmail.com",
  password: "testing123@"
};

exports.newUserDupEmail = {
  username: "azadesuu2",
  email: "azadesuu@gmail.com",
  password: "testing123@"
};

exports.newUserDupUsername = {
  username: "azadesuu",
  email: "azadesuu@gmail.com",
  password: "testing123@"
};

exports.newUserNoEmail = {
  username: "azadesuu",
  password: "testing123@"
};

exports.newUserInvalidUname = {
  username: "azadesuu?!",
  email: "sawy@student.unimelb.edu.au",
  password: "testing123@"
};

exports.newUserInvalidEmail = {
  username: "azadesuu",
  email: "sawystudent.unimelb.edu.au",
  password: "testing123@"
};

exports.newUserNoPassword = {
  username: "azadesuu",
  email: "azadesuu@gmail.com"
};

//login
exports.loginValidEmail = {
  email: "azadesuu@gmail.com",
  password: "test123@"
};

// integration tests

exports.userTests = [
  {
    _id: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
    username: "celenesaw",
    email: "azadesuu@gmail.com",
    password: "$2b$10$Q24bQEVo3HUTzbshMaAvVutFFfz8wwzSdFPtPU2t6kCqHV5tAPh2W"
  },
  {
    _id: mongoose.Types.ObjectId("6354ee5fd7bf245d8940dd69"),
    username: "claudya",
    email: "claudya@mail.com",
    password: "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe"
  },
  {
    _id: mongoose.Types.ObjectId("6354f876d7bf245d8940e058"),
    username: "login-test",
    email: "login-test@mail.com",
    password: "$2b$10$FBTHBAkSU6vcX65MBsPEMu7C.6nawurlah0C1j9aqw2.58nonfBg6"
  }
];

exports.reviewTests = [
  {
    _id: mongoose.Types.ObjectId("6354f048d7bf245d8940dd8e"),
    userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
    dateVisited: new Date("1665792000000"),
    restaurantName: "Florentino",
    address: {
      streetAddress: "80 Bourke St",
      postcode: 3000,
      state: "VIC",
      suburb: "Melbourne CBD",
      country: "Australia",
      _id: mongoose.Types.ObjectId("6354f048d7bf245d8940dd8f")
    },
    priceRange: 4,
    rating: 3,
    description: "Restaurant test 5",
    reviewImage: "",
    isPublic: true,
    tags: []
  }
];

// login tests
exports.integrationUser = {
  email: "azadesuu@gmail.com",
  password: "test123@"
};
exports.wrongIntegrationUser = {
  email: "azadesuu@gmail.com",
  password: "wrongpassword"
};
