import * as Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import passport from '@src/passport';
import logout from '@src/passport/logout';

import schema from '@src/graphql/schema';

const router = new Router();

const apiEntrypointPath = '/graphql';
const graphQlOpts = graphqlKoa({
  schema,
});

router
  .use(passport.initialize())
  .use(passport.session());

export const ok = async (ctx: Router.IRouterContext) => { ctx.status = 200; };

router.post('/signup', passport.authenticate('local-signup'), ok);
router.post('/login', passport.authenticate('local'), ok);
router.post('/logout', logout);

router.get(apiEntrypointPath, graphQlOpts);
router.post(apiEntrypointPath, graphQlOpts);

router.get('/graphiql', graphiqlKoa({ endpointURL: apiEntrypointPath }));

export default router;
