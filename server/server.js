const express = require("express");
const app = express();
const cors = require("cors");

const calendars = require("./routes/calendars");
require("dotenv").config;

app.use(express.json());
app.use(cors());
app.use("/calendars", calendars);

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port: ", process.env.PORT || 5000);
});
