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

module.exports = {
  app,
  server
};
