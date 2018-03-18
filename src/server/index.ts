import * as Koa from 'koa';

import * as database from '@src/initializers/database';
import router from '@src/server/router';

export const serve = async (port: number) => {
  await database.initialize();

  const app = new Koa();

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);
};
