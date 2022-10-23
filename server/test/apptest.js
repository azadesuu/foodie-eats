//setup server
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

//start tests
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
  await server.kill(function() {
    console.log("Closing test server");
    //the server is down when this is called. That won't take long. (<10s)
  });
});

// describe("Unit tests: User ", () => {
//
//   after(async () => {
//     await clearCollections();
//   });

//   it("Logs in the user", async function() {
//     return await request(app)
//       .post("/login")
//       .send(testInput.newUser)
//       .then(function(res) {
//         assert.equal(200, res.statusCode);
//       });
//   });

//   it("Doesn't register the duplicate user (email)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserDupEmail)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "That username/email is already taken."
//         });
//       });
//   });

//   it("Doesn't register the duplicate user (username)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserDupUsername)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "That username/email is already taken."
//         });
//       });
//   });

//   it("Doesn't register the empty field (email)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserNoEmail)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "Username/email not defined."
//         });
//       });
//   });

//   it("Doesn't register the invalid field (username)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserInvalidUname)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "Your username isn't valid."
//         });
//       });
//   });
//   it("Doesn't register the invalid field (email)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserInvalidEmail)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "Your email isn't valid."
//         });
//       });
//   });
//   //done register check
//   it("Doesn't register the invalid field (email)", async function() {
//     return await request(app)
//       .post("/signup")
//       .send(testInput.newUserInvalidEmail)
//       .then(function(res) {
//         assert.equal(400, res.statusCode);
//         res.body.should.includes({
//           message: "Your email isn't valid."
//         });
//       });
//   });

//   // get cases
//   it("Get recent reviews", async function() {
//     return await request(app)
//       .get("/review/getAllReviews")
//       .then(function(res) {
//         assert.equal(200, res.statusCode);
//         res.body.should.includes({ message: "All reviews found" });
//       });
//   });
// });

// Integration test
describe("Integration testing", () => {
  let server;
  let access_token;
  let refresh_token;
  let userId = "6354408a37d91973c1246a57";

  before(async () => {
    await User.insertMany(testInput.userTests);
    await Review.insertMany(testInput.reviewTests);
  });
  after(async () => {
    await clearCollections();
  });

  it("Logs in the user", async function() {
    return await request(app)
      .post("/login")
      .send(testInput.integrationUser)
      .then(function(res) {
        assert.equal(200, res.statusCode);
      });
  });

  it("Doesn't log in the user", async function() {
    return await request(app)
      .post("/login")
      .send(testInput.wrongIntegrationUser)
      .then(function(res) {
        assert.equal(400, res.statusCode);
      });
  });
});
