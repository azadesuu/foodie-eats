// set up db connection
require("dotenv").config();
const mongoose = require("mongoose");

const DB =
  process.env.DATABASE_ACCESS || "mongodb://localhost:27017/foodie-eats";

// connect to the DB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "foodie-eats"
});

const db = mongoose.connection;

require("./models/user");
require("./models/review");
require("./models/token");

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("connected to MongoDB!");
});

module.exports = db;
