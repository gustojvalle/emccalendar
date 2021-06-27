const express = require("express");
const Calendar = require("../models/calendar");

const calendars = express.Router();

calendars.get("/unique", (req, res) => {
  const { id } = req.query;

  Calendar.where({ id: id })
    .fetch()
    .then((cal) => res.status(200).json(cal))
    .catch((err) => res.status(400).json({ message: "Calendar not found" }));
});

calendars.get("/:userId", (req, res) => {
  Calendar.where({ user_id: req.params.userId })
    .fetchAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

calendars.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  new Calendar({
    ...body,
    user_id: parseInt(userId),
  })
    .save()
    .then((newCalendar) => res.status(200).json(newCalendar))
    .catch((err) =>
      res.status(400).json({ message: "unable to add calendar", err })
    );
});

calendars.put("/:calendarId", (req, res) => {
  const { body } = req;
  const { calendarId } = req.params;

  Calendar.where({ id: calendarId })
    .fetch()
    .then((calendar) => {
      calendar
        .save({
          ...calendar.attributes,
          ...body,
        })
        .then((modifiedCalendar) => res.status(200).json(modifiedCalendar));
    })
    .catch((err) =>
      res.status(400).json({ message: "couldn't retrieve calendar" })
    );
});

calendars.delete("/:calendarId", (req, res) => {
  let userId;
  Calendar.where({ id: req.params.calendarId })
    .fetch()
    .then((calendar) => {
      userId = calendar.attributes.user_id;

      calendar
        .destroy()
        .then(() => {
          Calendar.where({ user_id: userId })
            .fetchAll()
            .then((calendars) => {
              res.status(200).json(calendars);
            });
        })
        .catch((err) =>
          res.status(500).json({ message: "failed to retrieve user calendars" })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete calendar" })
    );
});

module.exports = calendars;
