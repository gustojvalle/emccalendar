import "./calendar.scss";
import React, { useEffect, useState, useContext } from "react";
import DayCard from "../../Components/DayCard/DayCard";
import { fetchCalendar } from "../../modules/fetchingData";
import LoginContext from "../../Context/LoginContext";
import TodoReview from "../../Components/TodoReview/TodoReview";

import queryString from "query-string";
import SocketContext from "../../Context/socketContext";

import { socketTodosHandler, setDaysArray } from "../../modules/calendarLogic";
import EditTodoInCal from "../../Components/EditTodoInCal/EditTodoInCal";

const Calendar = ({ params, history, login }) => {
  const queryParams = queryString.parse(history.location.search);

  const [todos, setTodos] = useState([]);
  const [calendar, setCalendar] = useState({ calendar_id: 3 });
  const [daysDivided, setDaysDivided] = useState([]);
  const [days, setDays] = useState([]);
  const [addingTodo, setAddingTodo] = useState(false);
  const [mounted, setMounted] = useState(true);
  const socket = useContext(SocketContext);

  useEffect(() => {
    let daysDivided = {};

    for (let i = 0; i < parseInt(calendar.big_block); i++) {
      daysDivided[`Block ${i}`] = [];
    }

    let counter = 0;
    days.map((day, index) => {
      if (index % calendar.small_block === 0 && index > 0) {
        counter++;
      }
      const key = `Block ${counter}`;

      daysDivided[key] && daysDivided[key].push(day);
      return null;
    });
    setDaysDivided(daysDivided);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

  useEffect(() => {
    if (days.length === 0 && mounted) {
      fetchCalendar(queryParams.id)
        .then(({ numOfDays, data }) => {
          const newNumOfDays = setDaysArray(numOfDays, data);
          socketTodosHandler(socket, queryParams.id, setTodos);
          setDays(newNumOfDays);

          setCalendar(data);
        })
        .catch((err) => {
          setMounted(false);
        });
    }
  });
  const handleOpenClose = (_e) => {
    setAddingTodo((prev) => !prev);
  };

  return (
    <LoginContext.Consumer>
      {({ login }) => {
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
                className={`calendar-page__cancel ${
                  addingTodo ? "--hidden" : ""
                }`}
                onClick={handleOpenClose}
              >
                <h3>{addingTodo ? "Cancel" : "Add Goal"}</h3>
              </button>
            </div>

            <div className="calendar-page__container">
              {Object.keys(daysDivided).map(
                (block, i) =>
                  daysDivided[block].length > 0 && (
                    <div key={i * 100} className="calendar-page__days">
                      <h2 className="calendar-page__days-title">{block}</h2>
                      <div className="calendar-page__block">
                        {daysDivided[block].map((day, i) => {
                          return (
                            <DayCard
                              key={i}
                              calendarId={calendar.id}
                              socket={socket}
                              todos={todos}
                              setTodos={setTodos}
                              day={day.dayString}
                              dayDate={day.dayDate}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )
              )}
            </div>

            <TodoReview socket={socket} setTodos={setTodos} todos={todos} />
          </div>
        );
      }}
    </LoginContext.Consumer>
  );
};

export default Calendar;
