import "./calendar-list.scss";
import React, { useState, useEffect } from "react";
import CalendarInfo from "../../Components/CalendarInfo/CalendarInfo";
import axios from "axios";
import LoginContext from "../../Context/LoginContext";

const CalendarList = () => {
  const [calendars, setCalendars] = useState([]);

  const fetchCalendars = async (userId) => {
    const response = await axios.get(
      `http://localhost:5001/calendars/${userId}`
    );
    setCalendars(response.data);
  };

  return (
    <div className="calendar-list">
      <LoginContext.Consumer>
        {({ login }) => {
          if (calendars.length === 0) {
            fetchCalendars(1);
          }
          console.log(calendars);
          return calendars.map((calendar) => (
            <CalendarInfo calendar={calendar} />
          ));
        }}
      </LoginContext.Consumer>
    </div>
  );
};

export default CalendarList;
