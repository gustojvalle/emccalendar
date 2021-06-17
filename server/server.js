const express = require("express");
const app = express();
const cors = require("cors");
const {
  updateTodo,
  fetchTodosCalendar,
} = require("./websocketLogic/websocketLogic");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const users = require("./routes/users");
const calendars = require("./routes/calendars");
const todos = require("./routes/todos");
const websocket = require("./routes/websocket");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/calendars", calendars);
app.use("/users", users);
app.use("/todos", todos);
app.use("/websocket", websocket);

io.on("connection", (socket) => {
  //fetching todos by calendar
  socket.on("fetchTodosCalendar", (data) => {
    console.log(data);
    fetchTodosCalendar(data, socket);
  });

  socket.on("updateTodo", (data) => {
    updateTodo(data.id, data.body).then((upTodo) =>
      socket.emit("resTodo", upTodo)
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on port: ", process.env.PORT || 5000);
});
