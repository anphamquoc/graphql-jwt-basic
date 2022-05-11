const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");

class Verify {
  verifyToken = async (accessToken) => {
    const token = accessToken.replace("Bearer ", "");
    if (!token) {
      throw new Error("Access token is missing");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      throw new Error("Access token is invalid");
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return decoded;
  };
  verifyAdmin = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    if (user.role !== "admin") {
      throw new ApolloError("You must be an admin");
    }
  };
}

module.exports = Verify;
