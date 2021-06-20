import React, { useEffect, useState } from "react";
import "./day-card.scss";
import Todo from "../ToDo/ToDo";
import {
  updatingTodo,
  comparingDates,
  todoReseting,
  socketTodosHandler,
  setDayDate,
} from "../../modules/calendarLogic";

const DayCard = ({ socket, dayDate, day, todos, setTodos, calendarId }) => {
  const dragHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, day) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("id");

    console.log("day Date", dayDate);
    console.log("day ", day);
    updatingTodo(dayDate, socket, todoId, todos, setTodos);
    console.log("todo");
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
          return (
            comparingDates(todo.estimated_completion, dayDate) && (
              <Todo
                todos={todos}
                setTodos={setTodos}
                todo={todo}
                todoId={todo.id}
                socket={socket}
              />
            )
          );
        })}
      </section>
    </div>
  );
};

export default DayCard;
