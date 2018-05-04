import { clean, expect, sinon, WrongError } from '@test/support/spec-helper';
import contextStub from '@test/support/koa/context-stub';

import * as database from '@src/initializers/database';
import logout from '@src/passport/logout';
import User from '@src/entities/User';
import { Connection } from 'typeorm';
import { Context } from 'koa';
import { RequestError } from '@src/lib/errors';

describe('@src/passport/logout', () => {
  let connection: Connection;
  let user: User;

  before(async () => {
    connection = await database.initialize();
  });

  beforeEach(async () => {
    user = await User.signUp(
      'myuser12345@email.com',
      'myser12345',
      'mypassword12345',
    );
  });

  afterEach(async () => {
    await clean();
  });

  after(async () => {
    await connection.close();
  });

  it('logs out a logged-in user', async () => {
    const ctx: Context = contextStub();
    ctx.logout = sinon.stub();
    ctx.state = { user };
    ctx.status = 404;

    await logout(ctx, async () => {});

    expect(ctx.logout).to.have.been.called;
    expect(ctx.status).to.eq(200);
  });

  it('throws a 401 Unauthorized for a non-logged-in user', async () => {
    const ctx: Context = contextStub();
    ctx.logout = sinon.stub();
    ctx.state = {};
    ctx.status = 404;

    try {
      await logout(ctx, async () => {});
      throw new WrongError();
    } catch (err) {
      expect(ctx.logout).not.to.have.been.called;
      expect(err).to.be.an.instanceof(RequestError);
      expect(err.status).to.eq(401);
    }
  });
});
