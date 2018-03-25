import * as Koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as koaSession from 'koa-session';

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
    app.use(
      require('koa-mount')(
        '/_coverage',
        require('koa-static')(process.cwd() + '/coverage/lcov-report'),
      ),
    );
  }

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

  Logger.info(`> Now listening on port ${port}…`);
};
