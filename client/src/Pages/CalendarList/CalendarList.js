import "./calendar-list.scss";
import React, { useState, useEffect } from "react";
import CalendarInfo from "../../Components/CalendarInfo/CalendarInfo";
import axios from "axios";
import LoginContext from "../../Context/LoginContext";
import { fullDateString } from "../../modules/calendarLogic";
import AddCalendar from "../../Components/AddCalendar/AddCalendar";
import { deleteCalendar } from "../../modules/fetchingData";

const CalendarList = ({ history, login }) => {
  const [calendars, setCalendars] = useState([]);
  const [calendarsInfo, setCalendarsInfo] = useState([]);
  const [name, setName] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [addingCalendar, setAddingCalendar] = useState(false);

  const fetchCalendars = async (userId, authorizationToken) => {
    const response = await axios.get(
      `http://localhost:5001/calendars/${userId}`,
      { headers: { authorization: authorizationToken } }
    );

    setCalendars(response.data);
  };

  const addNewCalendar = (_e) => {
    setAddingCalendar((prev) => !prev);
  };

  const deleteHandler = (_e, calendarId) => {
    deleteCalendar(calendarId, setCalendars);
  };

  useEffect(() => {
    const calendarInfoData = calendars.map((cal) => {
      const creationDate = fullDateString(cal.created_at);
      const startingDate = fullDateString(cal.starting_date);
      const size = `${cal.small_block} Day${cal.small_block > 1 ? "s" : ""} x ${
        cal.big_block
      }`;
      return { name: cal.name, creationDate, startingDate, size, id: cal.id };
    });
    setCalendarsInfo(calendarInfoData);
  }, [calendars]);

  useEffect(() => {
    login.user && setName(login.user.name);

    if (calendars.length === 0 && initialState) {
      const authorizationToken = `Bearer ${login.jwt}`;

      login.user &&
        login.jwt &&
        fetchCalendars(login.user.id, authorizationToken)
          .then(() => setInitialState(false))
          .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="calendar-list">
      {addingCalendar && (
        <AddCalendar
          addNewCalendar={addNewCalendar}
          calendars={calendars}
          setCalendars={setCalendars}
          history={history}
        />
      )}
      <h1 className="calendar-list__title">Welcome {name}</h1>
      <div className="calendar-list__container">
        <LoginContext.Consumer>
          {(props) => {
            return calendarsInfo.map((calendar) => (
              <CalendarInfo
                key={calendar.id}
                deleteHandler={deleteHandler}
                addNewCalendar={addNewCalendar}
                calendar={calendar}
              />
            ));
          }}
        </LoginContext.Consumer>
        <div className="calendar-list__add-container">
          <div onClick={addNewCalendar} className="calendar-list__add">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              width="64px"
              height="64px"
            >
              <path d="M105,23C105,23,105,23,105,23C82.4,0.4,45.6,0.4,23,23C0.4,45.6,0.4,82.4,23,105c11.3,11.3,26.2,17,41,17s29.7-5.7,41-17C127.6,82.4,127.6,45.6,105,23z M100.8,100.8c-20.3,20.3-53.3,20.3-73.5,0C7,80.5,7,47.5,27.2,27.2C37.4,17.1,50.7,12,64,12s26.6,5.1,36.8,15.2C121,47.5,121,80.5,100.8,100.8z" />
              <path d="M83,61H67V45c0-1.7-1.3-3-3-3s-3,1.3-3,3v16H45c-1.7,0-3,1.3-3,3s1.3,3,3,3h16v16c0,1.7,1.3,3,3,3s3-1.3,3-3V67h16c1.7,0,3-1.3,3-3S84.7,61,83,61z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
