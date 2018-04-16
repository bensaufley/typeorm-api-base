import { clean, expect, passportStrategyReq, sinon, WrongError } from '@test/support/spec-helper';

import { Request } from 'koa';
import { Connection } from 'typeorm';

import * as database from '@src/initializers/database';
import local from '@src/passport/strategies/local';
import User from '@src/entities/User';

describe('local', () => {
  let connection: Connection;
  let sandbox: sinon.SinonSandbox;
  let strategy: (reqFunc: (req: Request) => void) => Promise<[User, object | undefined]>;
  let user: User;

  before(async () => {
    connection = await database.initialize();
    sandbox = sinon.sandbox.create();
  });

  beforeEach(async () => {
    strategy = passportStrategyReq(local);
    user = await User.signUp(
      'myemail@email.com',
      'my-username',
      'its-my-password',
    );
  });

  afterEach(async () => {
    sandbox.restore();
    await clean();
  });

  after(async () => {
    await connection.close();
  });

  it('returns the user', async () => {
    const [u] = await strategy((req) => {
      req.body = {
        username: 'my-username',
        password: 'its-my-password',
      };
    });

    expect(u).to.eql(user);
  });

  it('throws an error for missing user', async () => {
    try {
      await strategy((req) => {
        req.body = {
          username: 'blah-user',
          password: 'its-my-password',
        };
      });
      throw new WrongError();
    } catch (err) {
      expect(err.message).to.eq('No user found with that username');
    }
  });

  it('throws an error for wrong password', async () => {
    try {
      await strategy((req) => {
        req.body = {
          username: 'my-username',
          password: 'not-my-password',
        };
      });
      throw new WrongError();
    } catch (err) {
      expect(err.message).to.eq('Invalid Password');
    }
  });

  it('throws another error', async () => {
    try {
      sandbox.stub(User, 'findOne').rejects(new Error('Something borked!'));
      await strategy((req) => {
        req.body = {
          username: 'my-username',
          password: 'not-my-password',
        };
      });
      throw new WrongError();
    } catch (err) {
      expect(err.message).to.eq('Something borked!');
    }
  });
});
