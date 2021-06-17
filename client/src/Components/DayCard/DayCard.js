import React, { useEffect, useState } from "react";
import "./day-card.scss";
import Todo from "../ToDo/ToDo";
import {
  updatingTodo,
  comparingDates,
  todoReseting,
  socketTodosHandler,
} from "../../modules/calendarLogic";

const DayCard = ({ socket, dayDate, day, todos, setTodos, calendarId }) => {
  const dragHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, day) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("id");

    const updateDate = dayDate.toISOString().slice(0, 19).replace("T", " ");

    console.log("todo", updateDate);

    // socket.emit("updateTodo", {
    //   id: parseInt(todoId),
    //   body: { estimated_completion: updateDate },
    // });

    updatingTodo(dayDate, socket, todoId, todos, setTodos);
    console.log("todo");
    // socketTodosHandler(socket, calendarId, setTodos);

    // const newTodos = todoReseting(todos, todoId, day);
    // setTodos(newTodos);
  };
  return (
    <div className="day-card">
      <h2 className="day-card__title">{day}</h2>
      <section
        id={day}
        onDragOver={(e) => dragHandler(e)}
        className="day-card__box"
        onDrop={(e) => dropHandler(e, day)}
      >
        {todos.map((todo) => {
          console.log(comparingDates(todo.estimated_completion, dayDate));
          return (
            comparingDates(todo.estimated_completion, dayDate) && (
              <Todo todo={todo} todoId={todo.id} />
            )
          );
        })}
      </section>
    </div>
  );
};

export default DayCard;
