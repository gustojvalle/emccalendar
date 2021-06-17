const bookshelf = require("../bookshelf");

const Todo = bookshelf.model("Todo", {
  tableName: "todos",
  calendars: function () {
    return this.belongsTo("Calendar");
  },
});

module.exports = Todo;
