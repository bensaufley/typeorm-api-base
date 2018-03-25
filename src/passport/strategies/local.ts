import { Strategy as LocalStrategy } from 'passport-local';

import User from '@src/entities/User';

export default new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (user && user.hasValidPassword(password)) done(null, user);
      else done(null, false);
    })
    .catch(done);
});
