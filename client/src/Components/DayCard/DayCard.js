import React from "react";
import "./day-card.scss";
import Todo from "../ToDo/ToDo";
import { updatingTodo, comparingDates } from "../../modules/calendarLogic";

const DayCard = ({ socket, dayDate, day, todos, setTodos, calendarId }) => {
  const dragHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, day) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("id");

    updatingTodo(dayDate, socket, todoId, todos, setTodos);
  };
  return (
    <div className="day-card">
      <h2 className="day-card__title">{day}</h2>
      <div className="day-card__divider"></div>

      <section
        id={day}
        onDragOver={(e) => dragHandler(e)}
        className="day-card__box"
        onDrop={(e) => dropHandler(e, day)}
      >
        {todos.map((todo) => {
          if (todo.active) {
            return (
              comparingDates(todo.estimated_completion, dayDate) && (
                <Todo
                  todos={todos}
                  setTodos={setTodos}
                  todo={todo}
                  todoId={todo.id}
                  socket={socket}
                  key={todo.id}
                />
              )
            );
          }
          return null;
        })}
      </section>
    </div>
  );
};

export default DayCard;
