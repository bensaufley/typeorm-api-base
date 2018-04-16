import { Strategy as LocalStrategy } from 'passport-local';

import User from '@src/entities/User';

export default new LocalStrategy(
  {
    passReqToCallback: true,
  },
  ({ body: { email } }, username, password, done) => {
    User.signUp(email, username, password)
      .then((user) => done(null, user))
      .catch((err) => {
        err.status = 422;
        done(err);
      });
  },
);
