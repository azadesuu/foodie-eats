require("dotenv").config();
require("./db");
const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

const passport = require("passport");
const flash = require("express-flash");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    credentials: true, // from Express docs: adds the Access-Control-Allow-Credentials CORS header
    origin: "https://cors-anywhere.herokuapp.com/https://foodie-eats.herokuapp.com/"
    //origin: "https://foodie-eats.herokuapp.com"
    //origin: "http://localhost:3000" // or your heroku url
  })
);

// setup a session store signing the contents using the secret key
app.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true
  })
);

// configure passport authenticator -- making sure we can access the strategies
require("./config/passport")(passport);
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
const userRoutes = require("./routes/passport/userRoutes");
const reviewRoutes = require("./routes/user/reviewRoutes");
const accountRoutes = require("./routes/user/accountRoutes");

// initialise express server
// enable cors for use of api in client
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is listening on port ${port}!`);
});

// bodyparser
app.use(express.json());

//app functions
app.use("/", userRoutes);
app.use("/account", accountRoutes);
app.use("/review", reviewRoutes);

// app.use(function(err, req, res, next) {
//   res
//     .status(err.status || 500)
//     .send({ message: err.message, stack: err.stack });
// });

module.exports = {
  app,
  server
};
