import { GraphQLResolveInfo } from 'graphql';

import User from '@src/entities/User';

export const user = (
  _obj: any,
  { id }: { id: string },
  _context?: any,
  _info?: GraphQLResolveInfo,
) => User.findOneById(id);

export const users = () => User.find();
