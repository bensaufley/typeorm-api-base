import { Middleware } from 'koa';
import { ValidationError } from 'class-validator';
import Logger from '@src/lib/Logger';

export const validationErrorReducer = (violations?: ValidationError[]) => (
  (violations || []).reduce(
    (arr, { constraints }) => ([
      ...arr,
      ...Object.values(constraints).filter(Boolean),
    ]),
    [] as string[],
  )
);

const koaErrorHandler: Middleware = async (ctx, next) => {
  try {
    Logger.debug(ctx.request.method, ctx.request.url, ctx.request.rawBody);
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.name,
      message: err.message,
      details: validationErrorReducer(err.violations),
    };
    (ctx.app as any).emit('error', err, ctx);
  }
};

export default koaErrorHandler;
