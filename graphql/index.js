const UserResolver = require("./resolvers/User");
const PostResolver = require("./resolvers/Post");
const UserTypeDef = require("./typeDefs/User");
const PostTypeDef = require("./typeDefs/Post");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const schema = makeExecutableSchema({
  typeDefs: [UserTypeDef, PostTypeDef],
  resolvers: [UserResolver, PostResolver],
});

module.exports = schema;
