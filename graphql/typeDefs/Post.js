const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID
    author_id: ID
    title: String
    description: String
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String, description: String): Post

    updatePost(title: String, description: String, id: ID!): Post

    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
