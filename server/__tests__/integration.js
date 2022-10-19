const chai = require("chai");
const expect = chai.expect;

// to test our endpoints
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

// Retrieving URI for test mongodb server
const db = require("../config/keys").testMongoURI;

// connecting to mock database...
mongoose.set("useFindAndModify", false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model("User");
const ItemBlock = mongoose.model("ItemBlock");
const ProfileBlock = mongoose.model("ProfileBlock");
const testInput = require("./testInput");

// testing our whole application
describe("App test", () => {
  let server;
  let access_token;
  let refresh_token;
  let user_id;
  let item_id;
  let profile_id = "1021b706175df1546e3acb10";

  // setting things up before testing (inputting test examples)
  before(async function() {
    this.timeout(15000);
    // starting local server
    server = app.listen(500);

    // inserting all tests into mock database
    await User.insertMany(testInput.userTests);
    await ItemBlock.insertMany(testInput.itemTests);
    await ProfileBlock.insertMany(testInput.profileTests);
  });

  // after finishing tests, delete all records in mock db and closing server

  after(async function() {
    this.timeout(15000);
    await User.deleteMany({});
    await ItemBlock.deleteMany({});
    await ProfileBlock.deleteMany({});
    await mongoose.connection.close();
    await server.close();
  });

  describe("Login a user into our website", function() {
    it("User logins in with incorrect email", function(done) {
      request(app)
        .post("/api/users/login")
        .send(testInput.loginInvalidEmail)
        .expect("Content-Type", /json/)
        .expect({
          message: "Email or Password is incorrect"
        })
        .expect(401, done);
    });

    it("User logins in with incorrect password", function(done) {
      request(app)
        .post("/api/users/login")
        .send(testInput.loginInvalidPassword)
        .expect("Content-Type", /json/)
        .expect({
          message: "Email or Password is incorrect"
        })
        .expect(401, done);
    });

    it("User puts correct credentials but did not confirm email", function(done) {
      request(app)
        .post("/api/users/login")
        .send(testInput.loginEmailNotConfirm)
        .expect("Content-Type", /json/)
        .expect({
          message: "Confirm your email"
        })
        .expect(401, done);
    });
  });
});
