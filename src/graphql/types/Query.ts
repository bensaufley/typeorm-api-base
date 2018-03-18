import { default as gql } from 'graphql-tag';

const Query = gql`
type Query {
  users: [User]
  user(id: String!): User
}
`;

export default Query;
