import { makeExecutableSchema } from 'graphql-tools';

import types from './types';
import resolvers from './resolvers';

export default makeExecutableSchema({
  resolvers,
  typeDefs: types,
});
