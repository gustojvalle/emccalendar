exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.boolean("active").defaultTo(true);
      table.timestamp("registered_at").defaultTo(knex.fn.now());
    })
    .createTable("calendars", (table) => {
      table.increments("id").primary();
      table.integer("big_block").notNullable();
      table.integer("small_block").notNullable();
      table.timestamp("starting_date").defaultTo(knex.fn.now());
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.json("todos");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("calendars").dropTable("users");
};
