require("dotenv").config();
require("./db");
require("./config/passport")(passport);
const http = require("http");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const socketio = require("socket.io");
const passport = require("passport");

// const userRoutes = require("./routes/passport/userRoutes");
// const customerRoutes = require("./routes/customer/customerRoutes");
// const vendorRoutes = require("./routes/vendor/vendorRoutes");
// const orderRoutes = require("./routes/order/orderRoutes");


// initialise express server
const app = express();
// enable cors for use of api in client
app.use(cors());
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
require("./config/sockets")(io);
app.set("io", io);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
