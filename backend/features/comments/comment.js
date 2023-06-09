const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const history = [];
io.on("connection", (conn) => {
  console.log("user connected");
  conn.on("message", (data) => {
    history.push(data);
    io.emit("message", data);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome 😊"));

server.listen(8081, () => {
  console.log("Server running on Port 8081");
});
