import { clean, expect, passportStrategyReq, WrongError } from '@test/support/spec-helper';

import { Request } from 'koa';
import { Connection } from 'typeorm';

import * as database from '@src/initializers/database';
import localSignup from '@src/passport/strategies/local-signup';
import User from '@src/entities/User';

describe('localSignup', () => {
  let connection: Connection;
  let strategy: (reqFunc: (req: Request) => void) => Promise<[User, object | undefined]>;

  before(async () => {
    connection = await database.initialize();
  });

  beforeEach(() => {
    strategy = passportStrategyReq(localSignup);
  });

  afterEach(async () => {
    await clean();
  });

  after(async () => {
    await connection.close();
  });

  it('creates a new user', async () => {
    await expect(() => (
      strategy((req) => {
        req.body = {
          email: 'myemail@test.com',
          username: 'my-username',
          password: 'its-my-password',
        };
      })
    )).to.alter(
      () => User.count(),
      { by: 1 },
    );
  });

  it('returns the user', async () => {
    const [user] = await strategy((req) => {
      req.body = {
        email: 'myemail@test.com',
        username: 'my-username',
        password: 'its-my-password',
      };
    });

    expect(user).to.be.an.instanceOf(User);
  });

  it('throws an error for an invalid user', async () => {
    try {
      await strategy((req) => {
        req.body = {
          email: 'myemail@test.com',
          username: 'my-username',
          password: 'my-password',
        };
      });
      throw new WrongError();
    } catch (err) {
      expect(err).not.to.be.an.instanceOf(WrongError);
    }
  });

  it('does not create a new user when invalid', async () => {
    let count = -Infinity;
    try {
      count = await User.count();
      await strategy((req) => {
        req.body = {
          email: 'myemail@test.com',
          username: 'my-username',
          password: 'my-password',
        };
      });
      throw new WrongError();
    } catch (err) {
      expect(await User.count()).to.eq(count);
    }
  });
});
