import { Strategy as LocalStrategy } from 'passport-local';

import User from '@src/entities/User';

export default new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    const email = req.body.email;
    User.signUp(email, username, password)
      .then((user) => done(null, user))
      .catch((err) => {
        err.status = 422;
        done(err);
      });
  },
);
