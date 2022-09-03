require("dotenv").config();
require("./db");
// require("./config/passport")(passport);
const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
// const socketio = require("socket.io");
// const passport = require("passport");

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
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});