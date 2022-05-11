const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    address: String
    age: Int
    username: String
    password: String
  }

  input UserLogin {
    username: String!
    password: String!
  }

  type UserResponse {
    accessToken: String
    refreshToken: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    register(
      name: String
      email: String
      address: String
      age: Int
      username: String
      password: String
    ): User

    login(user: UserLogin!): UserResponse

    updateUser(name: String, email: String, address: String): User

    deleteUser(id: ID!): User
  }
`;
module.exports = typeDefs;
