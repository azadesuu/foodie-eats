const mongoose = require("mongoose");

// Unit tests
// Register
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

//login
exports.loginValidEmail = {
  email: "azadesuu@gmail.com",
  password: "Testing123@"
};

// integration tests

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
    restaurantName: "Restaurant",
    reviewImage: "",
    isPublic: true,
    priceRange: 3,
    rating: 5,
    address: {
      _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd73"),
      streetAddress: "test",
      postcode: 3000,
      state: "VIC",
      suburb: "test",
      country: "Australia"
    },
    tags: [],
    description: "description"
  },
  {
    _id: mongoose.Types.ObjectId("6354efb3d7bf245d8940dd79"),
    userId: mongoose.Types.ObjectId("6354f876d7bf245d8940e058"),
    restaurantName: "Restaurant",
    reviewImage: "",
    isPublic: true,
    priceRange: 3,
    rating: 5,
    address: {
      _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd73"),
      streetAddress: "test",
      postcode: 3000,
      state: "VIC",
      suburb: "test",
      country: "Australia"
    },
    tags: [],
    description: "description other"
  }
];

// login tests
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
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
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
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
  tags: [],
  description: "description "
};
exports.createReviewWrongUserId = {
  restaurantName: "Resto2",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 3,
  rating: 5,
  address: {
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
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
    streetAddress: "test",
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
  restaurantName: "Restaurant",
  reviewImage: "",
  isPublic: true,
  dateVisited: "20220812",
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
  tags: [],
  description: "description"
};

exports.updateReviewDescription = {
  _id: mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72"),
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Restaurant",
  reviewImage: "",
  dateVisited: "20220812",
  isPublic: true,
  priceRange: 4,
  rating: 5,
  address: {
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

exports.updateReviewNoId = {
  userId: mongoose.Types.ObjectId("6354408a37d91973c1246a57"),
  restaurantName: "Restaurant",
  reviewImage: "",
  isPublic: true,
  priceRange: 4,
  dateVisited: "20220812",
  rating: 5,
  address: {
    streetAddress: "test",
    postcode: 3000,
    state: "VIC",
    suburb: "test",
    country: "Australia"
  },
  tags: [],
  description: "description updated!"
};

exports.bookmarksList = {
  bookmarks: [mongoose.Types.ObjectId("6354ef7ed7bf245d8940dd72")]
};

exports.updateUser1 = {
  bio: "Let's change this user's bio.",
  username: "celenesaw1",
  email: "sawcelene2001@gmail.com"
};

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
// change theme
exports.changeThemeUser1 = { newTheme: "blueberry" };
exports.changeThemeUser1wrong = { newTheme: "error" };

// MANUAL TESTS:
//  - reset/forgot password (requires external email access)
//  - change image
