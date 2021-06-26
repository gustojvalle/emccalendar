exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.boolean("active").defaultTo(true);
      table.timestamp("registered_at").defaultTo(knex.fn.now());
      table.string("salt");
    })
    .createTable("calendars", (table) => {
      table.string("name").notNullable();
      table.increments("id").primary();
      table.integer("big_block").notNullable();
      table.integer("small_block").notNullable();
      table.timestamp("starting_date").defaultTo(knex.fn.now());
      table.timestamp("created_at").defaultTo(knex.fn.now());

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .raw("ALTER TABLE calendars AUTO_INCREMENT = 1000")
    .createTable("todos", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.timestamp("creation").defaultTo(knex.fn.now());
      table.timestamp("estimated_completion").notNullable();
      table.timestamp("day").defaultTo(knex.fn.now());
      table
        .integer("calendar_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("calendars")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("completed").defaultTo(false);
      table.boolean("active").defaultTo(true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("todos")
    .dropTable("calendars")
    .dropTable("users");
};
