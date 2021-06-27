const express = require("express");
const app = express();
const cors = require("cors");

const {
  postTodo,
  updateTodo,
  fetchTodosCalendar,
  deleteTodo,
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
const { authorize } = require("./middleware/middleware");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(authorize);
app.use("/calendars", calendars);

app.use("/todos", todos);
app.use("/websocket", websocket);
app.use("/users", users);

io.on("connection", (socket) => {
  //fetching todos by calendar
  socket.on("fetchTodosCalendar", (data) => {
    fetchTodosCalendar(data, socket);
  });

  socket.on("updateTodo", (data) => {
    updateTodo(data.id, data.body)
      .then((upTodo) => socket.emit("resTodo", upTodo))
      .catch((err) => console.log("failed to update database"));
  });

  socket.on("postTodo", (data) => {
    postTodo(data.body, socket);
  });

  socket.on("deleteTodo", (todoId, calendarId) => {
    console.log(calendarId);
    deleteTodo(socket, todoId, calendarId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on port: ", process.env.PORT || 5000);
});
