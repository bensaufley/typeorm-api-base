import { Strategy as LocalStrategy } from 'passport-local';

import User from '@src/entities/User';

export default new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) done(new Error('No user found with that username'), false);
      else if (user.hasValidPassword(password)) done(null, user);
      else done(new Error('Invalid Password'), false);
    })
    .catch((err) => { done(err, false); });
});
