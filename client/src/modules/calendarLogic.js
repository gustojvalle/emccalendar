export const setDayDate = (day, startDate) => {
  let dayDate = new Date(startDate);
  dayDate.setDate(dayDate.getDate() + day);
  return dayDate;
};

export const dateString = (date) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return `${weekDays[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
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
    console.log(todo);
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
    console.log("received data: ", data);
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
  const updateDate = dayDate.toISOString().slice(0, 19).replace("T", " ");

  console.log("todo", updateDate);

  socket.emit("updateTodo", {
    id: parseInt(todoId),
    body: { estimated_completion: updateDate },
  });
  socket.on("resTodo", (data) => {
    let newTodos = todos.filter((todo) => todo.id !== parseInt(todoId));
    newTodos.push(data);
    setTodos(newTodos);
  });
};
