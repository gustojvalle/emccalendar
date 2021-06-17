const Todo = require("../models/todo");

const updateTodo = async (id, data) => {
  const todo = await Todo.where({ id: id }).fetch();
  const newTodo = { ...todo.attributes, ...data };
  const resTodo = await todo.save(newTodo);
  return resTodo;
};
const fetchTodosCalendar = (calendar_id, socket) => {
  const todo = Todo.where({ calendar_id: calendar_id })
    .fetchAll()
    .then((todos) => {
      socket.emit("todosByCalendar", todos);
    });
};

module.exports = { updateTodo, fetchTodosCalendar };
