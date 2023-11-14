/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("authors", function (table) {
      table.increments("id").primary();
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("books", function (table) {
      table.increments("id").primary();
      table.string("title");
      table.integer("author_id").unsigned().references("id").inTable("authors");
      table.timestamps(true, true);
    })
    .createTable("customers", function (table) {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.string("phone");
      table.timestamps(true, true);
    })
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("username");
      table.string("password");
      table.timestamps(true, true);
    })
    .createTable("orders", function (table) {
      table.increments("id").primary();
      table.string("title");
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
      table.timestamps(true, true);
    })
    .createTable("book_order", function (table) {
      table.increments("id").primary();
      table.string("title");
      table.integer("book_id").unsigned().references("id").inTable("books");
      table.integer("order_id").unsigned().references("id").inTable("orders");
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("books")
    .dropTableIfExists("book_order")
    .dropTableIfExists("orders")
    .dropTableIfExists("authors")
    .dropTableIfExists("users")
    .dropTableIfExists("customers");
};
