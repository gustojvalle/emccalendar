import "./todo.scss";

import React, { useState } from "react";
import EditTodoInCal from "../EditTodoInCal/EditTodoInCal";
import { deleteTodo, updatingTodoAll } from "../../modules/calendarLogic";

const ToDo = ({ setTodos, todos, todo, todoId, socket, review }) => {
  // const [isDragged, setIsDragged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("id", todo.id);
    // setIsDragged(true);
  };

  const dragHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    console.log("dropped");
    // setIsDragged(false);
  };

  const changeIsEditing = (_e) => {
    setIsEditing(!isEditing);
  };

  const deleteHandler = (_e) => {
    deleteTodo(socket, todo.id, todo.calendar_id, setTodos, todos);
  };

  const completeHandler = (e) => {
    const completeTodo = { ...todo, completed: !todo.completed };
    updatingTodoAll(socket, todo.id, todos, setTodos, completeTodo);
    console.log(completeTodo);
  };

  return (
    <>
      {!isEditing ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => dragStartHandler(e, todoId)}
          onDrag={dragHandler}
          onDrop={dropHandler}
          className={`${review ? "todo__review" : "todo"} ${
            todo.completed ? "--complete" : ""
          }`}
          draggable
        >
          <div
            className={
              todo.completed
                ? "todo__completed-mask todo__completed-mask--completed"
                : "todo__completed-mask"
            }
          ></div>
          <h3 className="todo__title">{todo.name}</h3>
          <p className="todo__description">{todo.description}</p>

          <div className="todo__button-container">
            <button onClick={changeIsEditing} className="todo__button">
              edit
            </button>
            <button className="todo__button" onClick={deleteHandler}>
              delete
            </button>
            <button
              onClick={completeHandler}
              className={`todo__completed ${
                todo.completed ? "--complete" : ""
              }`}
            >
              &#10003;
            </button>
          </div>
        </div>
      ) : (
        <EditTodoInCal
          todos={todos}
          setTodos={setTodos}
          changeIsEditing={changeIsEditing}
          todo={todo}
          isEditing={isEditing}
        />
      )}
    </>
  );
};

export default ToDo;
