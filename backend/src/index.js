import { ApolloServer, PubSub } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import mongoose from 'mongoose';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

require('dotenv').config();

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // Wat gebeurt hier? Waarom kan in http initieren met ws?
  // Waar word de apollo server aan gekoppeld nu ?

  const ws = createServer(app);
  server.installSubscriptionHandlers(ws);

  ws.listen({ port: process.env.PORT }, () => {
    console.log(`server running at http://localhost:${process.env.PORT + server.graphqlPath}`);
    console.log(`subscription server running at ws://localhost:${process.env.PORT + server.subscriptionsPath}`);
  });
};

startServer();
