import axios from "axios";

const REQ_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  return `Bearer ${localStorage.getItem("jwtUserToken")}`;
};

const generatingArray = (initial, final) => {
  let arrayOfNumbers = [];
  for (let i = initial; i <= final; i++) {
    arrayOfNumbers = [...arrayOfNumbers, i];
  }
  return arrayOfNumbers;
};

const fetchCalendars = async (userId) => {
  const authorizationToken = getAuthToken();
  const response = await axios.get(`${REQ_URL}/calendars/${userId}`, {
    headers: { authorization: authorizationToken },
  });

  return response.data;
};

const fetchCalendar = async (calendarId) => {
  const authorizationToken = getAuthToken();
  const response = await axios.get(
    `${REQ_URL}/calendars/unique?id=${calendarId}`,
    { headers: { authorization: authorizationToken } }
  );
  const numOfDays = response.data.small_block * response.data.big_block;

  return { numOfDays: generatingArray(1, numOfDays), data: response.data };
};

const postCalendar = async (calendarInfo, userId, calendars, callback) => {
  const authorizationToken = getAuthToken();

  const response = await axios.post(
    `${REQ_URL}/calendars/${userId}`,
    calendarInfo,
    { headers: { authorization: authorizationToken } }
  );
  callback([...calendars, response.data]);

  return response.data;
};

const putCalendar = async (calendarInfo, calendars, callback) => {
  const authorizationToken = getAuthToken();
  let startingDate = new Date(calendarInfo.starting_date);
  startingDate = startingDate.toISOString().slice(0, 19).replace("T", " ");
  let createdAt = new Date(calendarInfo.created_at);
  createdAt = createdAt.toISOString().slice(0, 19).replace("T", " ");

  const response = await axios.put(
    `${REQ_URL}/calendars/${calendarInfo.id}`,
    {
      ...calendarInfo,
      starting_date: startingDate,
      created_at: createdAt,
    },
    { headers: { authorization: authorizationToken } }
  );

  const calendarsFiltered = calendars.filter(
    (cal) => cal.id !== calendarInfo.id
  );
  callback([response.data, ...calendarsFiltered]);
};

const deleteCalendar = (calendarId, setCalendars) => {
  const authorizationToken = getAuthToken();
  axios
    .delete(`${REQ_URL}/calendars/${calendarId}`, {
      headers: { authorization: authorizationToken },
    })
    .then((res) => {
      setCalendars(res.data);
    })
    .catch((err) => console.log("Unable to delete calendar"));
};

const loginServerRequest = (data, login, callback, history) => {
  axios
    .get(
      `${REQ_URL}/users/login/byemail?email=${data.email}&&password=${data.password}`
    )
    .then((res) => {
      callback({
        ...login,
        user: res.data.user,
        isLoggedIn: true,
        jwt: res.data.token,
      });

      localStorage.setItem("jwtUserToken", res.data.token);
      history.push("/");
    })
    .catch((err) => console.log("Login failed"));
};

const registerUser = (user) => {
  axios
    .post(`${REQ_URL}/users/signup/byemail`, user)
    .then((res) => {})
    .catch((err) => console.log("Unable to register user"));
};

export {
  fetchCalendars,
  fetchCalendar,
  postCalendar,
  putCalendar,
  deleteCalendar,
  loginServerRequest,
  registerUser,
};
