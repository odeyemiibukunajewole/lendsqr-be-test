// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];
module.exports = {
  development: {
    client: config.dialect,
    connection: {
      database: config.database,
      user: config.username,
      password: config.password,
    },
    migrations: {
      tableName: config.tableName,
      directory: config.migrationsPath,
    },
    seeds: {
      directory: config.seedersPath,
    },
    pool: {
      min: 0,
      max: 5,
      afterCreate: function (conn: any, done: any) {
        conn.query('SET timezone="UTC";', function (err: any) {
          if (err) {
            done(err, conn);
          } else {
            conn.query("SELECT set_limit(0.01);", function (err: any) {
              done(err, conn);
            });
          }
        });
      },
    },
    debug: true,
    acquireConnectionTimeout: 10000,
  },

  production: {
    client: config.dialect,
    connection: {
      database: config.database,
      user: config.username,
      password: config.password,
    },
    migrations: {
      tableName: config.tableName,
      directory: config.migrationsPath,
    },
    seeds: {
      directory: config.seedersPath,
    },
  },
};
