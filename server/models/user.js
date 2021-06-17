const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  calendars: function () {
    return this.hasMany("Calendar");
  },
});

module.exports = User;
