const knex = require("knex");

const dbConfig = {
  client: "mysql2",
  connection: {
    host: "45.152.44.1",
    user: "u862327486_root",
    password: "yIv*S]H+3",
    database: "u862327486_games_reviews",
    port: 3306,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const db = knex(dbConfig);

module.exports = db;
