import "./calendar.scss";
import React, { useEffect, useState } from "react";
import DayCard from "../../Components/DayCard/DayCard";
import { fetchCalendars } from "../../modules/fetchingData";
import LoginContext from "../../Context/LoginContext";
import socketIOClient from "socket.io-client";
import queryString from "query-string";
import axios from "axios";
import {
  socketTodosHandler,
  setDaysArray,
  setDayDate,
  dateString,
} from "../../modules/calendarLogic";

const ENDPOINT = "http://localhost:5001";

const Calendar = ({ params, history }) => {
  console.log(history);
  const queryParams = queryString.parse(history.location.search);

  const [todos, setTodos] = useState([]);
  const [calendar, setCalendar] = useState({ calendar_id: 3 });
  const [days, setDays] = useState([]);
  const [response, setResponse] = useState({});
  const socket = socketIOClient("http://localhost:5001");

  useEffect(() => {
    if (!days.length === 0) {
      console.log(days);
    }
  }, [days]);

  useEffect(() => {
    socketTodosHandler(socket, queryParams.id, setTodos);
    // axios
    //   .get(`http://localhost:5001/todos/${queryParams.id}`)
    //   .then((response) => console.log(response));
  }, []);

  const clicked = (e, calendar_id) => {
    console.log("clicked");

    socketTodosHandler(socket, calendar_id, setTodos);
  };

  return (
    <LoginContext.Consumer>
      {({ login }) => {
        console.log("login", login);
        if (days.length === 0) {
          fetchCalendars(queryParams.id)
            .then(({ numOfDays, data }) => {
              numOfDays = setDaysArray(numOfDays, data);
              socketTodosHandler(socket, queryParams.id, setTodos);
              setDays(numOfDays);
              setCalendar(data);
            })
            .catch((err) => {});
        }

        return (
          <div className="calendar" onDragOver={(e) => e.preventDefault()}>
            <button onClick={(e) => clicked(e, calendar.id)}>emmit</button>
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
        );
      }}
    </LoginContext.Consumer>
  );
};

export default Calendar;
