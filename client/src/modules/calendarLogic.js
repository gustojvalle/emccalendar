export const setDayDate = (day, startDate) => {
  let dayDate = new Date(startDate);

  dayDate.setDate(dayDate.getDate() + day);

  return dayDate;
};

export const dateString = (date) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return `${weekDays[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
};

export const dateStringInput = (date) => {
  let myDate;
  date ? (myDate = new Date(date)) : (myDate = Date.now());
  const day = myDate.getDate();
  const month = myDate.getMonth() + 1;
  const year = myDate.getFullYear();

  return `${year}-${month + 1 < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export const fullDateString = (date) => {
  const myDate = new Date(date);

  return `${myDate.getDate()}/${myDate.getMonth() + 1}/${myDate.getFullYear()}`;
};

export const todoDate = (date) => {
  const returnDate = new Date(date);
  return {
    day: returnDate.getDate(),
    month: returnDate.getMonth() + 1,
    year: returnDate.getFullYear(),
  };
};

export const comparingDates = (dateOne, dateTwo) => {
  const compOne = new Date(dateOne);
  const compTwo = new Date(dateTwo);

  if (
    compOne.getDate() === compTwo.getDate() &&
    compOne.getMonth() === compTwo.getMonth() &&
    compOne.getFullYear() === compTwo.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

export const todoReseting = (todos, todoId, day) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === parseInt(todoId)) {
      const newTodo = { ...todo, day: day };
      return newTodo;
    }
    return todo;
  });
  return newTodos;
};

export const setDaysArray = (numOfDays, data) => {
  numOfDays = numOfDays.map((day) => {
    const newDay = setDayDate(day, data.starting_date);
    return { dayString: dateString(newDay), dayDate: newDay };
  });
  return numOfDays;
};

export const socketTodosHandler = (socket, calendarId, callback) => {
  socket.emit("fetchTodosCalendar", calendarId);
  socket.on("todosByCalendar", (data) => {
    callback(data);
  });
};

export const updatingTodo = async (
  dayDate,
  socket,
  todoId,
  todos,
  setTodos
) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;

  const updateDate = new Date(dayDate - timezoneOffset)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  socket.emit("updateTodo", {
    id: parseInt(todoId),
    body: { estimated_completion: updateDate, active: true },
  });
  socket.on("resTodo", (data) => {
    let newTodos = todos.filter((todo) => todo.id !== parseInt(todoId));
    newTodos.push(data);
    setTodos(newTodos);
  });
};
export const updatingTodoAll = async (
  socket,
  todoId,
  todos,
  setTodos,
  updateInfo,
  setTodosUpdated
) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;

  const estimated_completion = new Date(
    new Date(updateInfo.estimated_completion) - timezoneOffset
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const creation = new Date(new Date(updateInfo.creation) - timezoneOffset)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  updateInfo = {
    ...updateInfo,
    creation,
    estimated_completion,
    day: updateInfo.day.slice(0, 19).replace("T", " "),
  };

  socket.emit("updateTodo", {
    id: parseInt(todoId),
    body: updateInfo,
  });
  socket.on("resTodo", (data) => {
    let newTodos = todos.filter((todo) => todo.id !== parseInt(todoId));

    newTodos.push(data);
    setTodos(newTodos);
  });
};

export const addTodo = (
  socket,
  todoData,
  todos,
  setTodos,
  calendarId,
  handleOpenClose,
  setUpdateInfo
) => {
  socket.emit("postTodo", {
    calendarId: calendarId,
    body: { ...todoData, calendar_Id: calendarId },
  });
  socket.on("resPostTodo", (data) => {
    setTodos([...todos, data]);
    setUpdateInfo({
      description: "",
      name: "",
      estimated_completion: "",
    });
    handleOpenClose();
  });
};

export const deleteTodo = (socket, todoId, calendarId, setTodos, todos) => {
  socket.emit("deleteTodo", todoId, calendarId);
  socket.on("deleteTodoRes", (data) => {
    setTodos(data);
  });
};
