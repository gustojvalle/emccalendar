const bookshelf = require("../bookshelf");

const Calendar = bookshelf.model("Calendar", {
  tableName: "calendars",
  inventories: function () {
    return this.belongsTo("User");
  },
});

module.exports = Calendar;
