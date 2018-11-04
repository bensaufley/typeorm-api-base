import * as Router from 'koa-router';

import passport from '@src/passport';
import logout from '@src/passport/logout';

const router = new Router();

router
  .use(passport.initialize())
  .use(passport.session());

export const ok = async (ctx: Router.IRouterContext) => { ctx.status = 200; };

router.post('/signup', passport.authenticate('local-signup'), ok);
router.post('/login', passport.authenticate('local'), ok);
router.post('/logout', logout);

export default router;
