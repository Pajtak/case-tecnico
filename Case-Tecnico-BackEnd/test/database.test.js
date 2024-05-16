const knex = require("knex");
const db = require("../src/database/database");

describe('Database', () => {
  it('should connect to the database', async () => {
    const expectedConfig = {
      host: '45.152.44.1',
      user: 'u862327486_root',
      password: 'yIv*S]H+3',
      database: 'u862327486_games_reviews',
      port: 3306,
    };

    const receivedConfig = db.client.config.connection;

    expect(receivedConfig.host).toBe(expectedConfig.host);
    expect(receivedConfig.user).toBe(expectedConfig.user);
    expect(receivedConfig.database).toBe(expectedConfig.database);
    expect(receivedConfig.port).toBe(expectedConfig.port);

  });
});