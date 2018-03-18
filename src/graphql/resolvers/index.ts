import { IResolvers } from 'graphql-tools';

import { user, users } from './users';

export default <IResolvers>{
  Query: {
    user,
    users,
  },
};
