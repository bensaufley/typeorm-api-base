import { expect } from '@test/support/spec-helper';

import * as db from '@src/initializers/database';

describe('database', () => {
  let dbUrl;

  beforeEach(() => {
    dbUrl = process.env.DATABASE_URL;
  });

  afterEach(() => {
    dbUrl = process.env.DATABASE_URL;
    delete require.cache[require.resolve('@src/initializers/database')];
  });

  describe('initialize', () => {
    it('works', async () => {
      const database: typeof db = await require('@src/initializers/database');
      const connection = await database.initialize();

      expect(connection).not.to.be.null;
      connection.close();
    });

    it('uses default db info', async () => {
      process.env.DATABASE_URL = '';
      await require('@src/initializers/database');
    });

    it('interprets a database url string', async () => {
      process.env.DATABASE_URL = 'postgres://pguser:pgpass@db:5432/typeorm_api_test';
      await require('@src/initializers/database');
    });

    it('interprets a malformed database url string', async () => {
      process.env.DATABASE_URL = 'postgres://';
      await require('@src/initializers/database');
    });
  });
});

