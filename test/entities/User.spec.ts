import { clean, expect } from '@test/support/spec-helper';

import { ValidationError } from 'class-validator';
import { Connection } from 'typeorm';

import * as database from '@src/initializers/database';
import Logger from '@src/lib/Logger';

import User from '@src/entities/User';

const violationMessages = (err: any) => {
  return err.violations.reduce(
    (arr: string[], v: ValidationError) => [
      ...arr,
      ...Object.values(v.constraints),
    ],
    [],
  );
};

describe('User', () => {
  let connection: Connection;

  before(async () => {
    connection = await database.initialize();
    await clean();
  });

  afterEach(clean);

  after(async () => {
    await connection.close();
  });

  // This is essentially testing the behavior of external packages. I don't
  // know if I want to keep it around. But I figured it'd be good to have some
  // basic tests for the User model, and the code does specify the validators;
  // doesn't hurt to test that they work as expected.
  describe('validation', () => {
    it('rejects a duplicate username', async () => {
      const firstUser = User.create({ username: 'my-test-user', email: 'myemail@email.com' });
      firstUser.password = 'my-test-password';
      await firstUser.save();

      const secondUser = User.create({ username: 'my-test-user', email: 'another-email@bla.com' });
      secondUser.password = 'another-password';

      try {
        await secondUser.save();
        throw new Error('Save should have thrown');
      } catch (err) {
        expect(err.message).to.eq('Error validating User');
        expect(violationMessages(err))
          .to.include('User already exists with username of my-test-user');
      }
    });

    it('rejects a duplicate email', async () => {
      const firstUser = User.create({ username: 'flargabo', email: 'myemail@email.com' });
      firstUser.password = 'my-test-password';
      await firstUser.save();

      const secondUser = User.create({ username: 'blargabo', email: 'myemail@email.com' });
      secondUser.password = 'another-password';

      try {
        await secondUser.save();
        throw new Error('Save should have thrown');
      } catch (err) {
        expect(err.message).to.eq('Error validating User');
        expect(violationMessages(err))
          .to.include('User already exists with email of myemail@email.com');
      }
    });
  });
});
