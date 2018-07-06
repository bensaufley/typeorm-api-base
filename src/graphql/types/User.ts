import { default as gql } from 'graphql-tag';

const User = gql`
type User {
  id: String
  username: String
  email: String
  createdAt: String
  updatedAt: String
}
`;

export default User;
