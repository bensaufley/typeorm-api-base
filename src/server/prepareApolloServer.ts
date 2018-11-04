import { ApolloServer } from 'apollo-server-koa';
import { default as koaPlayground } from 'graphql-playground-middleware-koa';
import * as Koa from 'koa';
import * as Router from 'koa-router';

import schema from '@src/graphql/schema';

const apiEntrypointPath = '/graphql';

export default ({ app,  router }: { app: Koa, router: Router }) => {
  const apolloServer = new ApolloServer({
    schema,
  });

  router.get('/graphiql', koaPlayground({ endpoint: apiEntrypointPath }));

  apolloServer.applyMiddleware({ app, path: apiEntrypointPath });
};
