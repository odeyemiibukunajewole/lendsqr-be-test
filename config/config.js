/* eslint-disable prettier/prettier */
require("dotenv").config();
const path = require("path");
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql2",
    migrationsPath: path.join(__dirname, "../migrations"),
    seedersPath: path.join(__dirname, "../seeders"),
    tableName: "knex_migrations",
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "mysql2",
    migrationsPath: path.join(__dirname, "../migrations"),
    seedersPath: path.join(__dirname, "../seeders"),
    tableName: "knex_migrations",
  },
};
