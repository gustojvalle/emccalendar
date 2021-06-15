const calendars = require("../seed/calendars");
const users = require("../seed/users");

exports.seed = async (knex) => {
  await knex("users").del();
  await knex("users").insert(users);
  await knex("calendars").del();
  await knex("calendars").insert(calendars);
};
