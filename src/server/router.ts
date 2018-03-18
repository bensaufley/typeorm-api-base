import * as Router from 'koa-router';
import * as koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import schema from '@src/graphql/schema';

const router = new Router();

const apiEntrypointPath = '/graphql';
const graphQlOpts = graphqlKoa({
  schema,
});

router.get(apiEntrypointPath, graphQlOpts);
router.post(apiEntrypointPath, koaBody(), graphQlOpts);

router.get('/graphiql', graphiqlKoa({ endpointURL: apiEntrypointPath }));

export default router;
