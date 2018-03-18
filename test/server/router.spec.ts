import { expect } from '@test/support/spec-helper';

import * as Router from 'koa-router';

import router from '@src/server/router';

describe('server/router', () => {
  it('works', () => {
    expect(router).to.be.an.instanceOf(Router);
  });

  it('has proper routes', () => {
    expect(router.stack.map((r) => r.path)).to.have.members([
      '/graphiql',
      '/graphql',
      '/graphql',
    ]);
  });
});

