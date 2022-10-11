/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary().unsigned();
    table.string("firstName");
    table.string("lastName").index().notNullable();
    table.string("email").unique().index().notNullable();
    table.string("password").notNullable();
    table.enum("role", ["USER", "ADMIN"]).defaultTo("USER");
    table.boolean("isActive").defaultTo(false);
    table.string("virtual_account_id");
    table.integer("balance").defaultTo(0);
    table.integer("previous_balance").defaultTo(0);
    table.integer("phone_number");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
