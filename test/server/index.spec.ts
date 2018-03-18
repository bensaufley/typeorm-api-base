import { expect, sinon } from '@test/support/spec-helper';
import * as Koa from 'koa';

import * as database from '@src/initializers/database';
import router from '@src/server/router';

import { serve } from '@src/server';

describe('server', () => {
  let sandbox: sinon.SinonSandbox;
  const routerRoutesReturn = 'router.routes return value';
  const routerAllowedMethodsReturn = 'router.allowedMethods return value';

  beforeEach(async () => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Koa.prototype, 'use').callsFake(function (this: typeof Koa) { return this; });
    sandbox.stub(Koa.prototype, 'listen').callsFake(function (this: typeof Koa) { return this; });
    sandbox.stub(router, 'routes').returns(routerRoutesReturn);
    sandbox.stub(router, 'allowedMethods').returns(routerAllowedMethodsReturn);
    sandbox.stub(database, 'initialize').resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('initializes the database connection', async () => {
    await serve(3000);

    expect(database.initialize).to.have.been.called;
  });

  it('initializes Koa', async () => {
    await serve(3000);

    expect(router.routes).to.have.been.called;
    expect(router.allowedMethods).to.have.been.called;
    expect(Koa.prototype.use).to.have.been.calledWith(routerRoutesReturn);
    expect(Koa.prototype.use).to.have.been.calledWith(routerAllowedMethodsReturn);
  });

  it('listens on the passed-in port', async () => {
    await serve(4923);

    expect(Koa.prototype.listen).to.have.been.calledWith(4923);
  });
});

