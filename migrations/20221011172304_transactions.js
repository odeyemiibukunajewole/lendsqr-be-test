/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.integer("id").primary().unsigned();
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.integer("amount");
    table.string("reference");
    table.string("currency");
    table.string("channel").defaultTo("PAYSTACK");
    table.enum("status", ["PENDING", "SUCCESS", "ERROR"]);
    table.string("access_code");
    table.string("authorization_url");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
