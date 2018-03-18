import { expect } from '@test/support/spec-helper';

import schema from '@src/graphql/schema';
import { GraphQLSchema } from 'graphql';

describe('schema', () => {
  it('works', () => {
    expect(schema).to.be.an.instanceOf(GraphQLSchema);
  });
});

