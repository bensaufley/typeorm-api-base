import * as Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import passport from '@src/passport';

import schema from '@src/graphql/schema';

const router = new Router();

const apiEntrypointPath = '/graphql';
const graphQlOpts = graphqlKoa({
  schema,
});

router
  .use(passport.initialize())
  .use(passport.session());

const ok: Router.IMiddleware = async (ctx) => { ctx.status = 200; };

router.post('/signup', passport.authenticate('local-signup'), ok);
router.post('/login', passport.authenticate('local'), ok);

router.get(apiEntrypointPath, graphQlOpts);
router.post(apiEntrypointPath, graphQlOpts);

router.get('/graphiql', graphiqlKoa({ endpointURL: apiEntrypointPath }));

export default router;
