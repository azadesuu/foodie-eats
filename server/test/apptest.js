const { server, app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
var assert = require("assert");
const request = require("supertest");
// mock db
const { connectDB, clearCollections, closeDB } = require("./testdb");
//test input
const testInput = require("./testInput");
before(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearCollections();
});

after(async () => {
  await closeDB();
  await server.close();
});
// Integration test
describe("Integration test", () => {
  it("Get recent reviews", async function() {
    return await request(app)
      .get("/review/getAllReviews")
      .then(function(res) {
        assert.equal(200, res.statusCode);
      });
  });
});
