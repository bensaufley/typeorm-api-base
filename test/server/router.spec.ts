import { expect } from '@test/support/spec-helper';

import * as Router from 'koa-router';

import router, { ok } from '@src/server/router';

describe('server/router', () => {
  it('works', () => {
    expect(router).to.be.an.instanceOf(Router);
  });

  it('has proper routes', () => {
    expect(router.stack.map((r) => r.path)).to.have.members([
      '(.*)',
      '(.*)',
      '/signup',
      '/login',
      '/graphiql',
      '/graphql',
      '/graphql',
    ]);
  });

  describe('ok', () => {
    it('sets status to 200', async () => {
      const ctx: any = { status: null };

      await ok(ctx);

      expect(ctx.status).to.eq(200);
    });
  });
});

