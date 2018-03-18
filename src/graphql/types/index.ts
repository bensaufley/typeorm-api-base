import { ITypeDefinitions } from 'graphql-tools';

import schema from './schema';
import User from './User';
import Query from './Query';

export default <ITypeDefinitions>[
  schema,
  Query,
  User,
];
