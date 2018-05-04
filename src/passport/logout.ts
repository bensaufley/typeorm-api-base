import { Middleware } from 'koa';

import { RequestError } from '@src/lib/errors';

const logout: Middleware = async (ctx) => {
  if (!ctx.state.user) throw new RequestError('User not logged in', 401);

  ctx.logout();
  ctx.status = 200;
};

export default logout;
