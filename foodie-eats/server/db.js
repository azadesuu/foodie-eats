// set up db connection
require("dotenv").config();
const mongoose = require("mongoose");

const DB = "mongodb+srv://allforone:2022sem2itp4llforone@all-for-one.p09tmlv.mongodb.net/?retryWrites=true&w=majority"|| "mongodb://localhost:27017/foodie-eats";

// connect to the DB
mongoose.connect(DB, {
  //useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  dbName: "foodie-eats",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("connected to MongoDB!");
});

module.exports = db;