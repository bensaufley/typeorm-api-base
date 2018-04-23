import * as passport from 'koa-passport';

import { default as localStrategy } from '@src/passport/strategies/local';
import { default as localSignupStrategy } from '@src/passport/strategies/local-signup';
import User from '@src/entities/User';

export const userSerializer = (
  user: User,
  done: (error: Error | null, response: string) => void,
) => { done(null, user.id); };

export const userDeserializer = async (
  id: string,
  done: (error: Error | null, response?: User | boolean) => void,
) => {
  try {
    const user = await User.findOne({ id });
    done(null, user || false);
  } catch (err) {
    done(err);
  }
};

passport.serializeUser(userSerializer);
passport.deserializeUser(userDeserializer);

passport.use('local-signup', localSignupStrategy);
passport.use('local', localStrategy);

export default passport;
