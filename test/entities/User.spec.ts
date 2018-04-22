import { clean, expect } from '@test/support/spec-helper';

import { ValidationError } from 'class-validator';
import { Connection } from 'typeorm';

import * as database from '@src/initializers/database';

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

    it('rejects a missing password for a new user', async () => {
      const user = User.create({ username: 'flargabo', email: 'myemail@email.com' });

      try {
        await user.save();
        throw new Error('Save should have thrown');
      } catch (err) {
        expect(err.message).to.eq('Error validating User');
        expect(violationMessages(err))
          .to.include('password should not be null or undefined');
      }
    });

    it('does not reject a missing password for an existing user', async () => {
      const user = User.create({ username: 'flargabo', email: 'myemail@email.com' });
      user.password = 'my-test-password';
      await user.save();

      const sameUser = await User.findOne({ email: 'myemail@email.com' });
      sameUser!.username = 'blargaboo';

      await sameUser!.save();

      const userAgain = await User.findOne({ username: 'blargaboo' });

      expect(userAgain).to.exist;
    });
  });

  describe('signUp', () => {
    it('creates a user', async () => {
      await User.signUp('myemail@test.com', 'my-new-user', 'its-my-password');

      const user = await User.findOne({ email: 'myemail@test.com', username: 'my-new-user' });

      expect(user).to.exist;
    });
  });

  describe('hasValidPassword', () => {
    it('returns true for valid user', async () => {
      await User.signUp('myemail@test.com', 'my-new-user', 'its-my-password');
      const user = await User.findOne({ username: 'my-new-user' });

      expect(user!.hasValidPassword('its-my-password')).to.be.true;
    });

    it('returns false for invalid user', async () => {
      await User.signUp('myemail@test.com', 'my-new-user', 'its-my-password');
      const user = await User.findOne({ username: 'my-new-user' });

      expect(user!.hasValidPassword('not-my-password')).to.be.false;
    });
  });

  describe('exposedAttributes', () => {
    it('returns only a certain subset of attributes', async () => {
      await User.signUp('myemail@test.com', 'my-new-user', 'its-my-password');
      const user = await User.findOne({ username: 'my-new-user' });

      expect(user!.exposedAttributes).to.have.all.keys(
        'createdAt', 'updatedAt', 'id', 'username', 'email',
      );
      expect(user!.exposedAttributes.createdAt).to.be.an.instanceOf(Date);
      expect(user!.exposedAttributes.updatedAt).to.be.an.instanceOf(Date);
      expect(user!.exposedAttributes.id).to.be.a('string');
      expect(user!.exposedAttributes.username).to.eq('my-new-user');
      expect(user!.exposedAttributes.email).to.eq('myemail@test.com');
    });
  });
});
