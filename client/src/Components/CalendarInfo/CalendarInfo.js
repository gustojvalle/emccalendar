import "./calendar-info.scss";
import React from "react";
import { Link } from "react-router-dom";

const CalendarInfo = ({ calendar, addNewCalendar, deleteHandler }) => {
  console.log(calendar);
  return (
    <div className="calendar-info">
      <Link className="calendar-info__link" to={`/calendar?id=${calendar.id}`}>
        <div className="calendar-info__label-container">
          <label>Calendar Name</label>
          <h3 className="calendar-info__title">{calendar.name}</h3>
        </div>
        <div className="calendar-info__label-container">
          <label>Starting Date</label>
          <h3 className="calendar-info__title">{calendar.startingDate}</h3>
        </div>

        <div className="calendar-info__label-container">
          <label>Creation Date</label>
          <h3 className="calendar-info__title">{calendar.creationDate}</h3>
        </div>

        <div className="calendar-info__label-container">
          <label>Size</label>
          <h3 className="calendar-info__title">{calendar.size}</h3>
        </div>
      </Link>

      <div className="calendar-info__link-container">
        <Link
          className="calendar-info__edit"
          onClick={(e) => addNewCalendar()}
          to={`/?calendarId=${calendar.id}`}
        >
          Edit
        </Link>

        <button onClick={(e) => deleteHandler(e, calendar.id)}>Delete</button>
      </div>
    </div>
  );
};

export default CalendarInfo;
