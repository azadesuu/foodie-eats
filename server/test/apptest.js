// -------------- SERVER SETUP --------------

require("dotenv").config();

const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

const passport = require("passport");
const flash = require("express-flash");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://foodie-eats.netlify.app/",
    "http://foodie-eats-beta.netlify.app/",
    "http://localhost:3000"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
// setup a session store signing the contents using the secret key
app.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true
  })
);

// configure passport authenticator -- making sure we can access the strategies
require("../config/passport")(passport);
//middleware that's required for passport to operate
app.use(passport.initialize());
// middleware to store user object
app.use(passport.session());
// use flash to store messages
app.use(flash());

// important to receive data sent to API using POST, parses and makes available the
// request body
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // replaces body-parser

// define where static assets live
app.use(express.static("public"));

//routes
const userRoutes = require("../routes/passport/userRoutes");
const reviewRoutes = require("../routes/user/reviewRoutes");
const accountRoutes = require("../routes/user/accountRoutes");

// bodyparser
app.use(express.json());

//app functions
app.use("/", userRoutes);
app.use("/account", accountRoutes);
app.use("/review", reviewRoutes);

// bad request error handling, url not found
app.use((req, _, next) => {
  const err = new Error(`Route: ${req.originalUrl} does not exist.`);
  err.status = 404;
  next(err);
});

// general error handling
app.use((err, req, res, _) => {
  if (
    err?.name === "CastError" ||
    err?.name === "ValidationError" ||
    err?.code === 16755
  ) {
    err.status = 400;
    err.message = "Bad Request";
  }
  res.status(err.status || 500).json({
    status: "fail",
    error: err.message
  });
});

// initialise express server
// enable cors for use of api in client
const port = 5001;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is listening on port ${port}!`);
});

// -------------- TESTS imports --------------
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
var killable = require("killable");
killable(server);
var assert = require("assert");
var should = require("chai").should();
const request = require("supertest");

// mock db
const { connectDB, clearCollections, closeDB } = require("./testdb");
//test input
const testInput = require("./testInput");
const Token = require("../models/token");
const User = require("../models/user");
const Review = require("../models/review");

before(async () => {
  await connectDB();
});

after(async () => {
  await closeDB();
  await server.kill(() => {
    console.log("Closing test server..");
    console.log("End of tests.");
    //the server is down when this is called. That won't take long. (<10s)
  });
});

// -------------- TESTS --------------
// Unit Tests
describe("Unit tests ", () => {
  // clear data from db after tests
  after(async () => {
    console.log("Clearing collections..");
    await clearCollections();
  });

  describe("Registration ", () => {
    it("Registers the user", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUser)
        .then(function(res) {
          assert.equal(200, res.statusCode);
        });
    });
    it("Doesn't register the duplicate user (email)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserDupEmail)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "That username/email is already taken."
          });
        });
    });
    it("Doesn't register the duplicate user (username)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserDupUsername)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "That username/email is already taken."
          });
        });
    });
    it("Doesn't register the empty field (email)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserNoEmail)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Username/email not defined."
          });
        });
    });
    it("Doesn't register the invalid field (username)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserInvalidUname)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Your username isn't valid."
          });
        });
    });
    it("Doesn't register the invalid field (email)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserInvalidEmail)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Your email isn't valid."
          });
        });
    });
    it("Doesn't register the invalid field (email)", async function() {
      return await request(app)
        .post("/signup")
        .send(testInput.newUserInvalidEmail)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Your email isn't valid."
          });
        });
    });
    // done register check
  });

  describe("Get Reviews ", () => {
    // get recent/top reviews
    it("Get recent reviews", async function() {
      return await request(app)
        .get("/review/getReviewsByRecent")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "Recent reviews found" });
        });
    });

    it("Get top reviews", async function() {
      return await request(app)
        .get("/review/getReviewsByLikes")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "Most liked reviews found." });
        });
    });
  });
  //get user

  describe("Get one user ", () => {
    it("Get one user", async function() {
      return await request(app)
        .get("/account/profile/azadesuu")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "User was found by username" });
        });
    });

    // no content found error
    it("Doesn't get invalid user", async function() {
      return await request(app)
        .get("/account/profile/aza")
        .then(function(res) {
          assert.equal(204, res.statusCode);
        });
    });
  });
});

// Integration Tests
describe("Integration tests: Review methods", () => {
  let access_token;
  let userId = testInput.userId;
  let reviewId = testInput.reviewId;

  // before all tests
  before(async () => {
    await clearCollections();
    await User.insertMany(testInput.userTests);
    await Review.insertMany(testInput.reviewTests);
  });

  // after all tests
  after(async () => {
    console.log("Clearing collections..");
    await clearCollections();
  });

  describe("Get inserted User/Review", () => {
    it("Get one review", async function() {
      return await request(app)
        .get("/review/getReview/6354ef7ed7bf245d8940dd72")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "Review found" });
        });
    });
    it("Get one user", async function() {
      return await request(app)
        .get("/account/profile/celenesaw")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "User was found by username" });
        });
    });
  });
  describe("Integration: Log in User", () => {
    it("Logs in the user", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.integrationUser)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          // setting tokens for user_auth
          assert.equal(true, res.body !== undefined);
          access_token = res.body;
        });
    });

    it("Doesn't log in the user (wrong password)", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.wrongIntegrationUser)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "No user was found with the given user/email"
          });
        });
    });

    it("Doesn't log in the user (wrong email+password)", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.wrongIntegrationUser2)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "No user was found with the given user/email"
          });
        });
    });
  });

  describe("Integration: Authenticate user", () => {
    it("Valid access token provided", async function() {
      return await request(app)
        .get("/findTokenUser")
        .set({ Authorization: `${access_token}` })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.data.should.includes({
            username: testInput.userTests[0].username
          });
        });
    });
  });

  describe("Integration: Create Review", () => {
    it("Creates a review: Review 1", async function() {
      return await request(app)
        .put("/review/createReview")
        .send(testInput.createReview1)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review created."
          });
        });
    });
    it("Creates a review: Review 2", async function() {
      return await request(app)
        .put("/review/createReview")
        .send(testInput.createReview2)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review created."
          });
        });
    });
    it("Doesn't create review: missing fields (userId)", async function() {
      return await request(app)
        .put("/review/createReview")
        .send(testInput.createReviewWrongUserId)
        .then(function(res) {
          assert.equal(400, res.statusCode);
        });
    });
    it("Doesn't create review: missing fields (dateVisited)", async function() {
      return await request(app)
        .put("/review/createReview")
        .send(testInput.createReviewWrongDateVisited)
        .then(function(res) {
          assert.equal(400, res.statusCode);
        });
    });
  });

  describe("Integration: Update Review", () => {
    it("Updates a review: Review 1 (Price Range)", async function() {
      return await request(app)
        .patch("/review/updateReview")
        .send(testInput.updateReviewPriceRange)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review updated."
          });
        });
    });
    it("Updates a review: Review 1 (Description)", async function() {
      return await request(app)
        .patch("/review/updateReview")
        .send(testInput.updateReviewDescription)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review updated."
          });
        });
    });

    it("Updates a review: Review 1 (Private)", async function() {
      return await request(app)
        .patch("/review/updateReview")
        .send(testInput.updateReviewPrivate)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review updated."
          });
          res.body.data.should.includes({
            isPublic: false
          });
        });
    });

    it("Updates a review: Review 1 (Public)", async function() {
      return await request(app)
        .patch("/review/updateReview")
        .send(testInput.updateReviewPublic)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review updated."
          });
          res.body.data.should.includes({
            isPublic: true
          });
        });
    });

    it("Doesn't update a review: Review (No Review Id) ", async function() {
      return await request(app)
        .patch("/review/updateReview")
        .send(testInput.updateReviewNoId)
        .then(function(res) {
          assert.equal(400, res.statusCode);
        });
    });
  });

  describe("Integration: Like Review", () => {
    it("Likes a review: Review 1", async function() {
      return await request(app)
        .patch(`/review/like/${userId}/${reviewId}`)
        .send({ likeBool: false })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Successfully liked the review"
          });
        });
    });
    it("Un-likes a review: Review 1", async function() {
      return await request(app)
        .patch(`/review/like/${userId}/${reviewId}`)
        .send({ likeBool: true })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Successfully unliked the review"
          });
        });
    });

    it("Failed to like a review: Review 1 (likeBool undefined)", async function() {
      return await request(app)
        .patch(`/review/like/${userId}/${reviewId}`)
        .send({ likeBool: undefined })
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Like boolean was not received."
          });
        });
    });
  });
  describe("Integration: Delete Review", () => {
    it("Deletes a review: Review 1", async function() {
      return await request(app)
        .delete(`/review/delete/${reviewId}`)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review deleted."
          });
        });
    });
    it("Fails to delete a review: Review 1 (already deleted) ", async function() {
      return await request(app)
        .delete(`/review/delete/${reviewId}`)
        .then(function(res) {
          assert.equal(204, res.statusCode);
        });
    });
  });
});
// Integration Tests
describe("Integration tests: Account methods", () => {
  let access_token;
  let userId = testInput.userId;
  let userId2 = testInput.userId2;
  let userId3 = testInput.userId3;
  let reviewId = testInput.reviewId;

  // before all tests
  before(async () => {
    await clearCollections();
    await User.insertMany(testInput.userTests);
    await Review.insertMany(testInput.reviewTests);
  });

  // after all tests
  after(async () => {
    console.log("Clearing collections..");
    await clearCollections();
  });

  describe("Get inserted User/Review", () => {
    it("Get one review", async function() {
      return await request(app)
        .get("/review/getReview/6354ef7ed7bf245d8940dd72")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "Review found" });
        });
    });
    it("Get one user", async function() {
      return await request(app)
        .get("/account/profile/celenesaw")
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({ message: "User was found by username" });
        });
    });
  });
  describe("Integration: Log in User", () => {
    it("Logs in the user", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.integrationUser)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          // setting tokens for user_auth
          access_token = res.body;
        });
    });

    it("Doesn't log in the user (wrong password)", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.wrongIntegrationUser)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "No user was found with the given user/email"
          });
        });
    });

    it("Doesn't log in the user (wrong email+password)", async function() {
      return await request(app)
        .post("/login")
        .send(testInput.wrongIntegrationUser2)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "No user was found with the given user/email"
          });
        });
    });
  });

  describe("Integration: Get My Reviews", () => {
    it("Get my reviews: User 1", async function() {
      return await request(app)
        .get(`/account/my-reviews/${userId}`)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "My reviews found."
          });
        });
    });
  });

  describe("Integration: Get Other Reviews", () => {
    it("Get other reviews: User 3 (list of 1)", async function() {
      return await request(app)
        .get(`/account/other-reviews/${userId3}`)
        .send(testInput.wrongIntegrationUser2)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Other reviews found."
          });
          assert.equal(1, res.body.data.length);
        });
    });
    it("Get other reviews: User 2 (list of 0)", async function() {
      return await request(app)
        .get(`/account/other-reviews/${userId2}`)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Other reviews found."
          });
          assert.equal(0, res.body.data.length);
        });
    });
  });

  describe("Integration: Bookmark Review", () => {
    it("Bookmarks a review: Review 1", async function() {
      return await request(app)
        .patch(`/account/bookmark/${reviewId}/${userId}`)
        .send({ bookmarkedBool: false })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review was bookmarked."
          });
        });
    });
    it("Un-bookmarks a review: Review 1", async function() {
      return await request(app)
        .patch(`/account/bookmark/${reviewId}/${userId}`)
        .send({ bookmarkedBool: true })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review was un-bookmarked."
          });
        });
    });

    it("Failed to bookmark a review: Review 1 (bookmarkedBool undefined)", async function() {
      return await request(app)
        .patch(`/account/bookmark/${reviewId}/${userId}`)
        .send({ bookmarkedBool: undefined })
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "Bookmarked bool was not received."
          });
        });
    });
  });

  describe("Integration: Get Bookmarks", () => {
    it("Bookmarks a review: Review 1, User 1", async function() {
      return await request(app)
        .patch(`/account/bookmark/${reviewId}/${userId}`)
        .send({ bookmarkedBool: false })
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Review was bookmarked."
          });
        });
    });
    it("Get my bookmarks: User 1", async function() {
      return await request(app)
        .post(`/account/my-bookmarks/get`)
        .send(testInput.bookmarksList)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "My bookmarks found."
          });
          assert.equal(1, res.body.data.length);
        });
    });

    it("Get bookmarks: list undefined", async function() {
      return await request(app)
        .post(`/account/my-bookmarks/get`)
        .then(function(res) {
          assert.equal(400, res.statusCode);
        });
    });
  });

  describe("Integration: Update User", () => {
    it("Updates user password", async function() {
      return await request(app)
        .put(`/account/updatePassword`)
        .send(testInput.updateUser1Password)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Successfully updated password."
          });
        });
    });
    it("Updates user password: weak password", async function() {
      return await request(app)
        .put(`/account/updatePassword`)
        .send(testInput.updateUser1PasswordWeak)
        .then(function(res) {
          assert.equal(400, res.statusCode);
        });
    });
    it("Updates user theme", async function() {
      return await request(app)
        .patch(`/account/changeTheme/${userId}`)
        .send(testInput.changeThemeUser1)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.should.includes({
            message: "Successfully updated theme."
          });
        });
    });
    it("Updates user theme: Undefined Theme", async function() {
      return await request(app)
        .patch(`/account/changeTheme/${userId}`)
        .send(testInput.changeThemeUser1Undefined)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "New theme is not defined."
          });
        });
    });
    it("Updates user theme: Invalid theme", async function() {
      return await request(app)
        .patch(`/account/changeTheme/${userId}`)
        .send(testInput.changeThemeUser1wrong)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({
            message: "New theme is not available."
          });
        });
    });
    it("Updates user details", async function() {
      return await request(app)
        .patch(`/account/updateUser/${userId}`)
        .send(testInput.updateUser1)
        .then(function(res) {
          assert.equal(200, res.statusCode);
          res.body.data.should.includes(testInput.updateUser1);
        });
    });
    it("Updates user details: Invalid username", async function() {
      return await request(app)
        .patch(`/account/updateUser/${userId}`)
        .send(testInput.updateUser1InvalidUsername)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({ message: "Username/Email is not valid." });
        });
    });
    it("Updates user details: Invalid email", async function() {
      return await request(app)
        .patch(`/account/updateUser/${userId}`)
        .send(testInput.updateUser1InvalidEmail)
        .then(function(res) {
          assert.equal(400, res.statusCode);
          res.body.should.includes({ message: "Username/Email is not valid." });
        });
    });
  });
});
