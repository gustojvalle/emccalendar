const Todo = require("../models/todo");

const updateTodo = async (id, data) => {
  const todo = await Todo.where({ id: id }).fetch();
  console.log("ohh my data", data);
  const newTodo = { ...todo.attributes, ...data };
  console.log(newTodo);
  const resTodo = await todo.save(newTodo);
  return resTodo;
};
const fetchTodosCalendar = (calendar_id, socket) => {
  Todo.where({ calendar_id: calendar_id })
    .fetchAll()
    .then((todos) => {
      socket.emit("todosByCalendar", todos);
    });
};

const postTodo = (data, socket) => {
  const newTodo = new Todo();
  newTodo
    .save(data)
    .then((res) => {
      console.log(res);
      socket.emit("resPostTodo", res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTodo = (socket, todoId, calendarId) => {
  Todo.where({ id: todoId })
    .fetch()
    .then((todo) => {
      todo
        .destroy()
        .then((_res) => {
          Todo.where({ calendar_id: calendarId })
            .fetchAll()
            .then((todos) => socket.emit("deleteTodoRes", todos));
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

module.exports = { updateTodo, fetchTodosCalendar, postTodo, deleteTodo };
