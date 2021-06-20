import "./add-calendar.scss";
import { dateStringInput } from "../../modules/calendarLogic";

import React, { useState, useEffect, useContext } from "react";
import { postCalendar, putCalendar } from "../../modules/fetchingData";
import LoginContext from "../../Context/LoginContext";
import queryString from "query-string";

const AddCalendar = ({ setCalendars, calendars, addNewCalendar, history }) => {
  const queryParams = queryString.parse(history.location.search);
  let initialDate;
  let editCalendar;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (queryParams.calendarId) {
      editCalendar = calendars.find(
        (calendar) => calendar.id === parseInt(queryParams.calendarId)
      );
      initialDate = dateStringInput(editCalendar.starting_date);
      setFormData({ ...editCalendar, starting_date: initialDate });
    } else {
      initialDate = dateStringInput(Date.now());
      setFormData({ starting_date: initialDate });
    }
  }, []);

  const login = useContext(LoginContext);
  console.log(login);
  console.log(formData);

  const editHandler = (e) => {
    e.preventDefault();
    console.log(formData.id);
    putCalendar(formData, calendars, setCalendars)
      .then((data) => addNewCalendar())
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postCalendar(formData, login.login.user.id, calendars, setCalendars)
      .then((data) => addNewCalendar())
      .catch((err) => console.log(err));
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-calendar">
      <form
        onSubmit={!queryParams.calendarId ? submitHandler : editHandler}
        className="add-calendar__form"
      >
        <h2 className="add-calendar__title">
          {queryParams.calendarId ? "Edit Calendar" : "Add New Calendar"}
        </h2>
        <label>Name</label>
        <input
          onChange={changeHandler}
          name="name"
          className="add-calendar__input"
          type="text"
          placeholder="Calendar title..."
          value={formData.name}
          assert=""
        />
        <label>Small Block</label>
        <input
          value={formData.small_block}
          onChange={changeHandler}
          name="small_block"
          min="1"
          className="add-calendar__input"
          type="number"
          placeholder="Small Block duration..."
          assert=""
        />
        <label>Big Block</label>
        <input
          value={formData.big_block}
          onChange={changeHandler}
          name="big_block"
          min="2"
          className="add-calendar__input"
          type="number"
          placeholder="Big Block duration..."
          assert=""
        />
        <label>Starting From</label>
        <input
          onChange={changeHandler}
          name="starting_date"
          className="add-calendar__input"
          type="date"
          value={formData.starting_date}
          min={initialDate}
        />

        <button>Confirm</button>
      </form>
    </div>
  );
};

export default AddCalendar;
