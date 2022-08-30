require("./db");
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();

app.use(cors());
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});

server.listen(port, () => {
  console.log(`The server is listening on port ${port}!`);
});

app.use(express.json());

const userRoutes = require("./routes/routes");
app.use("/user", userRoutes);
app.use("/login", userRoutes);
app.use("/password-reset", userRoutes);

module.exports = {
  app,
  server,
};
