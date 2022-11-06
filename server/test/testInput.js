const mongoose = require("mongoose");

// -------------- UNIT TESTS --------------
// Registration
exports.newUser = {
  username: "azadesuu",
  email: "azadesuu@gmail.com",
  password: "Testing123@"
};

exports.newUserDupEmail = {
  username: "azadesuu2",
  email: "azadesuu@gmail.com",
  password: "Testing123@"
};

exports.newUserDupUsername = {
  username: "azadesuu",
  email: "azadesuu@gmail.com",
  password: "Testing123@"
};

exports.newUserNoEmail = {
  username: "azadesuu22",
  password: "Testing123@"
};

exports.newUserInvalidUname = {
  username: "azadesuu?!",
  email: "sawy@student.unimelb.edu.au",
  password: "Testing123@"
};

exports.newUserInvalidEmail = {
  username: "azadesuu22",
  email: "sawystudent.unimelb.edu.au",
  password: "Testing123@"
};

exports.newUserNoPassword = {
  username: "azadesuu",
  email: "azadesuu@gmail.com"
};

// -------------- INTEGRATION TESTS --------------
exports.userId = "6354408a37d91973c1246a57";
exports.userId2 = "6354ee5fd7bf245d8940dd69";
exports.userId3 = "6354f876d7bf245d8940e058";
exports.reviewId = "6354ef7ed7bf245d8940dd72";

exports.invalid_token = "invalid";
exports.wrong_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJib2R5Ijp7Il9pZCI6IjYzNTRlZTVmZDdiZ" +
  "jI0NWQ4OTQwZGQ2OSIsImVtYWlsIjoiY2xhdW" +
  "R5YUBtYWlsLmNvbSIsInVzZXJuYW1lIjoiY2x" +
  "hdWR5YSIsInRoZW1lIjoiZHJhZ29uZnJ1aXQi" +
  "fSwiaWF0IjoxNjY3NzUwOTI3fQ.hEmeYAkZfY" +
  "fpC3umgcgHqROz_ajD2NW1OKJPV56lXkY";

// initialising database data
exports.userTests = [
  {
    _id: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
    username: "celenesaw",
    email: "azadesuu@gmail.com",
    password: "$2b$10$Mg/B.0mOBAEUY5lsu1wa2ujKUywGPy2HB5.li45RCRYm.mcCDs1Cy"
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
    _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
    userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
    restaurantName: "Carl's Jr",
    reviewImage: "",
    isPublic: true,
    priceRange: 3,
    rating: 5,
    address: {
      _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd73"),
      streetAddress: "17 Franklin St",
      postcode: 3000,
      state: "VIC",
      suburb: "Melbourne",
      country: "Australia"
    },
    tags: [],
    description: "description"
  },
  {
    _id: mongoose.Types.ObjectId("6354efb3d7bf245d8940dd79"),
    userId: mongoose.Types.ObjectId("6354f876d7bf245d8940e058"),
    restaurantName: "Dragon Hot Pot",
    reviewImage: "",
    isPublic: true,
    priceRange: 3,
    rating: 5,
    address: {
      _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd73"),
      streetAddress: "20 Franklin St",
      postcode: 3000,
      state: "VIC",
      suburb: "Melbourne",
      country: "Australia"
    },
    tags: [],
    description: "description other"
  }
];
// Login Tests
exports.integrationUser = {
  email: "azadesuu@gmail.com",
  password: "Testing123@"
};
exports.wrongIntegrationUser = {
  email: "azadesuu@gmail.com",
  password: "wrongpassword"
};
exports.wrongIntegrationUser2 = {
  email: "azadesuu.wrong@gmail.com",
  password: "wrongpassword"
};

//REVIEW METHODS
//create review1
exports.createReview1 = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Resto",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 3,
  rating: 5,
  address: {
    streetAddress: "17 Resto St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description "
};
//create review2
exports.createReview2 = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Resto2",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 3,
  rating: 5,
  address: {
    streetAddress: "18 Resto St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description "
};
exports.createReviewWrongAddress = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Resto2",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 3,
  rating: 5,
  tags: [],
  description: "description "
};
exports.createReviewWrongDateVisited = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Resto2",
  reviewImage: "",
  isPublic: true,
  priceRange: 3,
  rating: 5,
  address: {
    streetAddress: "18 Resto St",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
  tags: [],
  description: "description "
};

//update review
exports.updateReviewPriceRange = {
  _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Carl's Jr",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "17 Franklin St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description"
};

exports.updateReviewDescription = {
  _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Carl's Jr",
  dateVisited: "20220812",
  reviewImage: "",
  isPublic: true,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "17 Franklin St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

exports.updateReviewPrivate = {
  _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Carl's Jr",
  dateVisited: "20220812",
  reviewImage: "",
  isPublic: false,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "17 Franklin St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

exports.updateReviewPublic = {
  _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Carl's Jr",
  dateVisited: "20220812",
  reviewImage: "",
  isPublic: true,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "17 Franklin St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

exports.updateReviewNoId = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Carl's Jr",
  dateVisited: "20220812",
  reviewImage: "",
  isPublic: true,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "17 Franklin St",
    postcode: 3000,
    state: "VIC",
    suburb: "Melbourne",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

//get bookmarks
exports.bookmarksList = {
  bookmarks: [mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72")]
};

//update user
exports.updateUser1 = {
  bio: "Let's change this user's bio.",
  username: "celenesaw1",
  email: "sawcelene2001@gmail.com"
};
exports.updateUser1InvalidUsername = {
  bio: "Let's change this user's bio.",
  username: "ce???!",
  email: "sawcelene2001@gmail.com"
};
exports.updateUser1InvalidEmail = {
  bio: "Let's change this user's bio.",
  username: "celenesaw1",
  email: "sawcelene2gmail"
};
//update user password
exports.updateUser1Password = {
  _id: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  oldPassword: "Testing123@",
  password: "Testing123@@"
};
exports.updateUser1PasswordWeak = {
  _id: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  oldPassword: "Testing123@",
  password: "lol"
};

//update user theme
exports.changeThemeUser1 = { newTheme: "blueberry" };
exports.changeThemeUser1Undefined = { newTheme: undefined };
exports.changeThemeUser1wrong = { newTheme: "error" };

// MANUAL TESTS:
//  - reset/forgot password (requires external email access)
//  - image change
