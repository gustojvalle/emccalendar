const bookshelf = require("../bookshelf");

const Calendar = bookshelf.model("Calendar", {
  tableName: "calendars",
  users: function () {
    return this.belongsTo("User");
  },
  todos: function () {
    return this.hasMany("Todo");
  },
});

module.exports = Calendar;
