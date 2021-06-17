import "./todo.scss";

import React, { useState, useEffect } from "react";

const ToDo = ({ todo, todoId }) => {
  const [isDragged, setIsDragged] = useState(false);

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("id", todo.id);
    setIsDragged(true);
  };

  const dragHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    console.log("dropped");
    setIsDragged(false);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => dragStartHandler(e, todoId)}
      onDrag={dragHandler}
      onDrop={dropHandler}
      className={`todo ${isDragged === true && "todo--dragged"}`}
      draggable
    >
      <h3 className="todo__title">{todo.name}</h3>
      <p className="todo__description">{todo.description}</p>
      <p className="todo__estimated">{todo.estimated_completion}</p>
      <button className="todo__button">edit</button>
    </div>
  );
};

export default ToDo;
