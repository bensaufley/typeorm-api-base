import { expect } from '@test/support/spec-helper';

import types from '@src/graphql/types';
import Query from '@src/graphql/types/Query';
import User from '@src/graphql/types/User';
import schema from '@src/graphql/types/schema';

describe('types', () => {
  describe('index', () => {
    it('works', () => {
      expect(types).to.be.an.instanceOf(Array);
    });
  });

  describe('Query', () => {
    it('is a gql object', () => {
      expect(Query.kind).to.eq('Document');
      expect(Query.definitions).to.have.lengthOf(1);
      expect(Query.definitions[0].name.value).to.eq('Query');
      expect(Query.definitions[0].kind).to.eq('ObjectTypeDefinition');
    });
  });

  describe('User', () => {
    it('is a gql object', () => {
      expect(User.kind).to.eq('Document');
      expect(User.definitions).to.have.lengthOf(1);
      expect(User.definitions[0].name.value).to.eq('User');
      expect(User.definitions[0].kind).to.eq('ObjectTypeDefinition');
    });
  });

  describe('schema', () => {
    it('is a gql object', () => {
      expect(schema.kind).to.eq('Document');
      expect(schema.definitions).to.have.lengthOf(1);
      expect(schema.definitions[0].kind).to.eq('SchemaDefinition');
    });
  });
});
