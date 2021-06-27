import "./add-calendar.scss";
import { dateStringInput } from "../../modules/calendarLogic";

import React, { useState, useEffect } from "react";
import { postCalendar, putCalendar } from "../../modules/fetchingData";
import LoginContext from "../../Context/LoginContext";
import queryString from "query-string";

const AddCalendar = ({ setCalendars, calendars, addNewCalendar, history }) => {
  const queryParams = queryString.parse(history.location.search);
  const [initialDate, setInitialDate] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    small_block: "",
    big_block: "",
    starting_date: "",
  });
  const [editCalendar, setEditCalendar] = useState({
    name: "",
    small_block: "",
    big_block: "",
    starting_date: "",
  });

  useEffect(() => {
    if (queryParams.calendarId) {
      setFormData({ ...editCalendar, starting_date: initialDate });
    } else {
      setFormData({ ...formData, starting_date: initialDate });
    }
  }, [initialDate]);

  useEffect(() => {
    if (queryParams.calendarId) {
      let calendarInfo = calendars.find(
        (calendar) => calendar.id === parseInt(queryParams.calendarId)
      );
      setEditCalendar(calendarInfo);
      setInitialDate(dateStringInput(calendarInfo.starting_date));
    } else {
      setInitialDate(dateStringInput(Date.now()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.calendarId]);

  const editHandler = (e) => {
    e.preventDefault();

    putCalendar(formData, calendars, setCalendars)
      .then((data) => {
        history.push("/");
        addNewCalendar();
      })
      .catch((err) => console.log(err));
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    addNewCalendar();
    history.push("/");
  };

  const submitHandler = (e, userId) => {
    e.preventDefault();
    postCalendar(formData, userId, calendars, setCalendars)
      .then((data) => {
        history.push("/");
        addNewCalendar();
      })
      .catch((err) => console.log("Unable to add calendar"));
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <LoginContext.Consumer>
      {({ login }) => {
        return (
          <div className="add-calendar">
            <form
              onSubmit={
                !queryParams.calendarId
                  ? (e) => submitHandler(e, login.user.id)
                  : editHandler
              }
              className="add-calendar__form"
            >
              <h2 className="add-calendar__title">
                {queryParams.calendarId ? "Edit Calendar" : "Add New Calendar"}
              </h2>
              <label className="add-calendar__label">Name</label>
              <input
                onChange={changeHandler}
                name="name"
                className="add-calendar__input"
                type="text"
                placeholder="Calendar title..."
                value={formData.name}
                assert=""
              />
              <label className="add-calendar__label">Small Block</label>
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
              <label className="add-calendar__label">Big Block</label>
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
              <label className="add-calendar__label">Starting From</label>
              <input
                onChange={changeHandler}
                name="starting_date"
                className="add-calendar__input"
                type="date"
                value={formData.starting_date}
                min={initialDate}
              />
              <div className="add-calendar__button-container">
                <button className="add-calendar__button">Confirm</button>
                <button
                  onClick={cancelHandler}
                  className="add-calendar__cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </LoginContext.Consumer>
  );
};

export default AddCalendar;
