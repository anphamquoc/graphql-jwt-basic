require("dotenv").config();
const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require("./graphql/index");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User.model");
const Verify = require("./utils/verifyToken");

const loadUser = async (accessToken) => {
  const verify = new Verify();
  const decoded = verify.verifyToken(accessToken);
  return decoded;
};

async function startServer() {
  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req }) => {
      const user = loadUser(req.headers.authorization);
      return user;
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello from server");
  });
  await mongoose.connect("mongodb://127.0.0.1:27017/post_db", {
    useUnifiedTopology: true,
  });
  console.log("mongodb connected");
  app.listen(4000, () => console.log("App start at port 4000"));
}
startServer();
