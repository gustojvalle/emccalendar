const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  inventories: function () {
    return this.hasMany("Calendar");
  },
});

module.exports = User;
