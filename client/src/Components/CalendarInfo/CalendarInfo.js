import "./calendar-info.scss";
import React from "react";

const CalendarInfo = ({ calendar }) => {
  return <div className="calendar-info"> {calendar.id}</div>;
};

export default CalendarInfo;
