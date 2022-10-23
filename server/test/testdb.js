require("dotenv").config();
const mongoose = require("mongoose");
const Review = require("../models/review");
const Token = require("../models/token");
const User = require("../models/user");

let db = null;
const connectDB = async () => {
  const DB =
    process.env.DATABASE_ACCESS || "mongodb://localhost:27017/foodie-eats";

  // connect to the DB
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "foodie-eats-test"
  });

  db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error: "));

  db.once("open", () => {
    console.log("connected to MongoDB-test!");
  });
};

const clearCollections = async () => {
  await User.deleteMany({});
  await Review.deleteMany({});
  await Token.deleteMany({});
};

const closeDB = async () => {
  console.log("Closing database.");
  await db.close();
};

module.exports = { connectDB, clearCollections, closeDB };
