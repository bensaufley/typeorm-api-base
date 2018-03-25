import * as passport from 'koa-passport';

import { default as localStrategy } from '@src/passport/strategies/local';
import { default as localSignupStrategy } from '@src/passport/strategies/local-signup';
import User from '@src/entities/User';

passport.serializeUser((user: User, done) => { done(null, user.id); });
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findOne({ id });
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

passport.use('local-signup', localSignupStrategy);
passport.use('local', localStrategy);

export default passport;
