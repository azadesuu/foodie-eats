  
// set up db connection
require("dotenv").config();
const mongoose = require("mongoose");

const DB =
   process.env.DATABASE_ACCESS ||
  "mongodb://localhost:27017/foodie-eats";

// connect to the DB
mongoose.connect(DB, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  dbName: "foodie-eats",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("connected to MongoDB!");
});

module.exports = db;
