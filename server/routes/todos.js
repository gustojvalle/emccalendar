const express = require("express");
const Todo = require("../models/todo");

const todos = express.Router();

todos.put("/:todoId", (req, res) => {
  const { body } = req;
  const { todoId } = req.params;

  Todo.where({ id: todoId })
    .fetch()
    .then((todo) => {
      const newTodo = { ...todo.attributes, ...body };

      todo
        .save(newTodo)
        .then((todoResponse) => res.status(200).json(todoResponse))
        .catch((err) => res.status(500).json({ message: "failed to update" }));
    })
    .catch((err) =>
      res.status(400).json({ message: "couldn't retrieve todo", err })
    );
});

todos.get("/calendar/:calendarId", (req, res) => {
  const { calendarId } = req.params;
  Todo.where({ calendar_id: calendarId })
    .fetchAll()
    .then((todos) => res.status(200).json(todos))
    .catch((err) =>
      res.status(400).json({ message: "calendar does not exist" })
    );
});

module.exports = todos;
