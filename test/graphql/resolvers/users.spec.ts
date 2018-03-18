import { expect } from '@test/support/spec-helper';

import { Connection } from 'typeorm';
import { v4 as UUIDv4 } from 'uuid';

import * as database from '@src/initializers/database';

import { user, users } from '@src/graphql/resolvers/users';

describe('resolvers/users', () => {
  let connection: Connection;

  before(async () => {
    connection = await database.initialize();
  });

  after(async () => {
    connection.close();
  });

  describe('user', () => {
    it('returns null for no match', async () => {
      const u = await user(null, { id: UUIDv4() });

      expect(u).to.be.undefined;
    });

    it('throws an error for an improper query', async () => {
      try {
        await user(null, { id: 'asdf' });
        throw new Error('Wrong Error!');
      } catch (err) {
        expect(err.message).to.eq('invalid input syntax for uuid: "asdf"');
      }
    });
  });

  describe('users', () => {
    it('returns an empty array for no match', async () => {
      const us = await users();

      expect(us).to.eql([]);
    });
  });
});

