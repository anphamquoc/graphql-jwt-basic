const UserModel = require("../../models/User.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Verify = require("../../utils/verifyToken");
const verify = new Verify();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const resolvers = {
  Query: {
    users: async (root, args, context) => {
      const { role, id } = context;
      if (!id) {
        throw new Error("You must be logged in");
      }
      if (role !== "admin") {
        throw new Error("You must be an admin");
      }
      return await UserModel.find();
    },

    user: async (root, args, context) => {
      return UserModel.findById(args.id);
    },
  },
  Mutation: {
    register: async (root, args, context) => {
      const hashPassword = await argon2.hash(args.password);
      return UserModel.create({ ...args, password: hashPassword });
    },
    login: async (root, args, context) => {
      const userInput = args.user;
      const user = await UserModel.findOne({ username: userInput.username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await argon2.verify(user.password, userInput.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }
      return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };
    },
    updateUser: async (root, args, context) => {
      return await UserModel.findByIdAndUpdate(args.id, { $set: args });
    },
    deleteUser: async (root, args, context) => {
      return await UserModel.findByIdAndDelete(args.id);
    },
  },
};

module.exports = resolvers;
