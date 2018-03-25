import * as Koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as koaMount from 'koa-mount';
import * as koaSession from 'koa-session';
import * as koaStatic from 'koa-static';
import * as path from 'path';

import * as database from '@src/initializers/database';
import koaErrorHandler from '@src/lib/koaErrorHandler';
import router from '@src/server/router';
import Logger from '@src/lib/Logger';

const koaSessionOpts = {
  key: 'koa:sess',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  renew: true,
};

const keys = process.env.KOA_KEYS || 'default key';

export const serve = async (port: number) => {
  await database.initialize();

  const app = new Koa();
  app.keys = keys.split(',');

  app
    .use(koaErrorHandler)
    .use(koaSession(koaSessionOpts, app))
    .use(koaBodyparser());

  if (process.env.NODE_ENV === 'development') {
    const kStatic: typeof koaStatic = require('koa-static');
    const mount: typeof koaMount = require('koa-mount');
    const p: typeof path = require('path');

    app.use(
      mount('/_coverage', kStatic(p.resolve(process.cwd(), 'coverage/lcov-report'))),
    );
  }

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

  Logger.info(`> Now listening on port ${port}…`);
};
