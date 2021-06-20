import "./edit-todo-in-cal.scss";
import React from "react";
import { useContext, useState, useEffect } from "react";
import SocketContext from "../../Context/socketContext";
import { updatingTodoAll, addTodo } from "../../modules/calendarLogic";

const EditTodoInCal = ({
  todos,
  setTodos,
  todo,
  changeIsEditing,
  calendarId,
  handleOpenClose,
  isEditing,

  addingTodo,
}) => {
  const socket = useContext(SocketContext);
  const [initial, setInitial] = useState({ initial: true, initialDate: "" });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});

  useEffect(() => {
    if (todo) {
      setUpdateInfo({
        ...todo,
        estimated_completion: new Date(todo.estimated_completion),
      });
    }
  }, []);

  useEffect(() => {
    let myNewInitialDate;
    if (initial.initial && todo) {
      const newDate = new Date(todo.estimated_completion);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      myNewInitialDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    } else {
      const myDate = new Date(Date.now());
      console.log(myDate.getDate());
      const year = myDate.getFullYear();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      myNewInitialDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    }
    console.log("checking initial", initial);
    setInitial({ ...initial, initialDate: myNewInitialDate });
  }, [todo]);

  const addNewTodo = (e) => {
    e.preventDefault();
    console.log(handleOpenClose);
    addTodo(
      socket,
      updateInfo,
      todos,
      setTodos,
      calendarId,
      handleOpenClose,
      setUpdateInfo
    );
  };

  const SubmitHandler = (e) => {
    initial.initial && setInitial({ ...initial, initial: false });
    e.preventDefault();
    isEditing && changeIsEditing();
    addingTodo && handleOpenClose();

    updatingTodoAll(socket, todo.id, todos, setTodos, updateInfo);
  };

  const changeHandler = (e) => {
    setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    e.target.name === "estimated_completion" && setIsUpdating(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    isEditing && changeIsEditing();
    addingTodo && handleOpenClose();
    console.log("cancel");
    // changeIsEditing();
  };

  useEffect(() => {
    console.log(updateInfo);
  }, [updateInfo]);
  return (
    <form onSubmit={(e) => e.preventDefault()} className="edit-cal">
      <input
        onChange={changeHandler}
        className="edit-cal__title"
        name="name"
        type="text"
        value={updateInfo.name}
        placeholder="Todo title..."
      />
      <input
        onChange={changeHandler}
        name="description"
        className="edit-cal__description"
        type="text"
        value={updateInfo.description}
        placeholder="Description..."
      />
      <div className="edit-cal__date">
        <label className="edit-cal__date-label">Due By</label>

        <input
          name="estimated_completion"
          onChange={changeHandler}
          className="edit-cal__estimated"
          type="date"
          value={
            !isUpdating ? initial.initialDate : updateInfo.estimated_completion
          }
        />
      </div>
      <div className="edit-cal__button-container">
        <button
          onClick={todo ? SubmitHandler : addNewTodo}
          className="edit-cal__button"
        >
          confirm
        </button>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTodoInCal;
