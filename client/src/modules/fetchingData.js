import axios from "axios";
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
  const numOfDays = response.data.small_block * response.data.big_block;

  return { numOfDays: generatingArray(1, numOfDays), data: response.data };
};

export { fetchCalendars };
