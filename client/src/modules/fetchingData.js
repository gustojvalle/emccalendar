import axios from "axios";

import { setDayDate } from "./calendarLogic";

const REQ_URL = "http://localhost:5001";

const generatingArray = (initial, final) => {
  let arrayOfNumbers = [];
  for (let i = initial; i <= final; i++) {
    arrayOfNumbers = [...arrayOfNumbers, i];
  }
  return arrayOfNumbers;
};

const fetchCalendars = async (userId) => {
  const response = await axios.get(`${REQ_URL}/calendars/${userId}`);
  console.log(response);

  return response.data;
};

const fetchCalendar = async (calendarId) => {
  const response = await axios.get(
    `${REQ_URL}/calendars/unique?id=${calendarId}`
  );
  const numOfDays = response.data.small_block * response.data.big_block;
  console.log("calendars ", response.data);
  return { numOfDays: generatingArray(1, numOfDays), data: response.data };
};

const postCalendar = async (calendarInfo, userId, calendars, callback) => {
  const response = await axios.post(
    `${REQ_URL}/calendars/${userId}`,
    calendarInfo
  );
  callback([...calendars, response.data]);
  return response.data;
};

const putCalendar = async (calendarInfo, calendars, callback) => {
  let startingDate = new Date(calendarInfo.starting_date);
  startingDate = startingDate.toISOString().slice(0, 19).replace("T", " ");
  let createdAt = new Date(calendarInfo.created_at);
  createdAt = createdAt.toISOString().slice(0, 19).replace("T", " ");

  const response = await axios.put(`${REQ_URL}/calendars/${calendarInfo.id}`, {
    ...calendarInfo,
    starting_date: startingDate,
    created_at: createdAt,
  });

  const calendarsFiltered = calendars.filter(
    (cal) => cal.id !== calendarInfo.id
  );
  callback([response.data, ...calendarsFiltered]);
};

const deleteCalendar = (calendarId, setCalendars) => {
  axios
    .delete(`${REQ_URL}/calendars/${calendarId}`)
    .then((res) => {
      setCalendars(res.data);
    })
    .catch((err) => console.log(err));
};

export {
  fetchCalendars,
  fetchCalendar,
  postCalendar,
  putCalendar,
  deleteCalendar,
};
