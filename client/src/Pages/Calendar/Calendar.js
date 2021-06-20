import "./calendar.scss";
import React, { useEffect, useState, useContext } from "react";
import DayCard from "../../Components/DayCard/DayCard";
import { fetchCalendar } from "../../modules/fetchingData";
import LoginContext from "../../Context/LoginContext";

import queryString from "query-string";
import SocketContext from "../../Context/socketContext";

import { socketTodosHandler, setDaysArray } from "../../modules/calendarLogic";
import EditTodoInCal from "../../Components/EditTodoInCal/EditTodoInCal";

const ENDPOINT = "http://localhost:5001";

const Calendar = ({ params, history }) => {
  const queryParams = queryString.parse(history.location.search);

  const [todos, setTodos] = useState([]);
  const [calendar, setCalendar] = useState({ calendar_id: 3 });
  const [days, setDays] = useState([]);
  const [addingTodo, setAddingTodo] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (days.length !== 0) {
      console.log("oh my days", days);
    }
  }, [days]);

  const handleOpenClose = (_e) => {
    setAddingTodo((prev) => !prev);
  };

  return (
    <LoginContext.Consumer>
      {({ login }) => {
        console.log(days.length);
        if (days.length === 0) {
          fetchCalendar(queryParams.id)
            .then(({ numOfDays, data }) => {
              const newNumOfDays = setDaysArray(numOfDays, data);
              socketTodosHandler(socket, queryParams.id, setTodos);
              setDays(newNumOfDays);
              console.log("oh my days", days);
              setCalendar(data);
            })
            .catch((err) => {});
        }

        return (
          <div className="calendar-page" onDragOver={(e) => e.preventDefault()}>
            <div className="calendar-page__add-todo">
              <div className={addingTodo ? "--open" : "--closed"}>
                <EditTodoInCal
                  handleOpenClose={handleOpenClose}
                  todos={todos}
                  setTodos={setTodos}
                  calendarId={calendar.id}
                  addingTodo={addingTodo}
                />
              </div>
              <button
                className="calendar-page__cancel"
                onClick={handleOpenClose}
              >
                {addingTodo ? "Cancel" : "Add todo"}
              </button>
            </div>
            <div className="calendar-page__container">
              {days.map((day) => (
                <DayCard
                  calendarId={calendar.id}
                  socket={socket}
                  todos={todos}
                  setTodos={setTodos}
                  day={day.dayString}
                  dayDate={day.dayDate}
                />
              ))}
            </div>
          </div>
        );
      }}
    </LoginContext.Consumer>
  );
};

export default Calendar;
