const express = require("express");
const websocket = express.Router();

websocket.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = websocket;
