require("dotenv").config();
require("./db");
// require("./config/passport")(passport);
const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

// modules for authentication lectures
const passport = require('passport');
const flash    = require('express-flash');
const jwt = require('jsonwebtoken');

// configure passport authenticator -- making sure we can access
// the strategies
require('./config/passport')(passport);

// IMPORTANT to enable CORS -- see  Week 7 lectures
app.use(cors({
credentials: true, // from Express docs: adds the Access-Control-Allow-Credentials CORS header
origin: "http://localhost:5000" // or your heroku url
}));


// setup a session store signing the contents using the secret key
app.use(session({ secret: process.env.PASSPORT_KEY,
resave: true,
saveUninitialized: true
}));

//middleware that's required for passport to operate
app.use(passport.initialize());
// middleware to store user object
app.use(passport.session());
// use flash to store messages
app.use(flash());



// important to receive data sent to API using POST, parses and makes available the 
// request body
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser

// define where static assets live
app.use(express.static('public'))	
//routes
const userRoutes = require("./routes/passport/userRoutes");
const reviewRoutes = require("./routes/user/reviewRoutes");  
const accountRoutes = require("./routes/user/accountRoutes");  
  

// const userRoutes = require("./routes/passport/userRoutes");
// const customerRoutes = require("./routes/customer/customerRoutes");
// const vendorRoutes = require("./routes/vendor/vendorRoutes");
// const orderRoutes = require("./routes/order/orderRoutes");


// initialise express server
// enable cors for use of api in client
app.use(cors());
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is listening on port ${port}!`);
});

// create a GET route
// app.get('/express_backend', (req, res) => { //Line 9
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
// });

// bodyparser
app.use(express.json());

//app functions
app.use("/", userRoutes);
app.use("/account", accountRoutes);
app.use("/review", reviewRoutes);

module.exports = {
  app,
  server,
};
