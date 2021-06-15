const express = require("express");
const Calendar = require("../models/calendar");

const calendars = express.Router();

calendars.get("/", (req, res) => {
  Calendar.fetchAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

calendars.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  new Calendar({
    ...body,
    user_id: parseInt(userId),
    todos: JSON.stringify(body.todos),
  })
    .save()
    .then((newCalendar) => res.status(200).json(newCalendar))
    .catch((err) =>
      res.status(400).json({ message: "unable to add calendar", err })
    );
});

calendars.put("/todo/:calendarId", (req, res) => {
  const { body } = req;
  const { calendarId } = req.params;
  console.log(calendarId);

  Calendar.where({ id: calendarId })
    .fetch()
    .then((calendar) => {
      console.log(calendar.attributes.todos);
      calendar
        .save({
          ...calendar.attributes,
          todos: JSON.stringify([
            ...JSON.parse(calendar.attributes.todos),
            body,
          ]),
        })
        .then((modifiedCalendar) => res.status(200).json(modifiedCalendar));
    })
    .catch((err) =>
      res.status(400).json({ message: "couldn't retrieve calendar" })
    );
});

module.exports = calendars;
