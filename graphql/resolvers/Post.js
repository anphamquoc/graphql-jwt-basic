const PostModel = require("../../models/Post.model");
const verifyToken = require("../../utils/verifyToken");

const resolvers = {
  Query: {
    posts: async (root, args, context) => {
      return await PostModel.find();
    },
    post: async (root, args, context) => {
      return await PostModel.findById(args.id);
    },
  },
  Mutation: {
    createPost: async (root, args, context) => {
      return await PostModel.create(args);
    },
    updatePost: async (root, args, context) => {
      return await PostModel.findByIdAndUpdate(args.id, { $set: args });
    },
    deletePost: async (root, args, context) => {
      return await PostModel.findByIdAndDelete(args.id);
    },
  },
};

module.exports = resolvers;
