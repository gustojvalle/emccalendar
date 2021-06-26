import "./todo-review.scss";
import React from "react";
import { updatingTodoAll } from "../../modules/calendarLogic";

import ToDo from "../ToDo/ToDo";

const TodoReview = ({ todos, setTodos, socket }) => {
  const dropHandler = (e) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("id");
    let newTodo = todos.find((todo) => todo.id === parseInt(todoId));
    newTodo = { ...newTodo, active: false };
    updatingTodoAll(socket, todoId, todos, setTodos, newTodo);

    console.log("droped");
  };

  return (
    <div className="todo-review">
      <h2 className="todo-review__title">Inactive goals</h2>
      <div className="day-card__divider"></div>
      <section onDrop={dropHandler} className="todo-review__draggable">
        {todos.map(
          (todo) =>
            !todo.active && (
              <ToDo
                key={todo.id}
                review={true}
                socket={socket}
                setTodos={setTodos}
                todo={todo}
                todos={todos}
              />
            )
        )}
      </section>
    </div>
  );
};

export default TodoReview;
