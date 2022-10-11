/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("gifts", function (table) {
    table.integer("id").primary().unsigned();
    table.integer('sender_id').unsigned()
    table.foreign("sender_id").references("users.id");
    table.integer('receiver_id').unsigned()
    table.foreign("receiver_id").references("users.id");
    table.integer("amount");
    table.enum("status", ["SUCCESS", "ERROR"]);
    table.string("transaction_remark");
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('gifts')

};
