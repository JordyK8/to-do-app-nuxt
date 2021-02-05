import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs} from './typeDefs'



const startServer = async() => {
    const app = express()
    
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
       
        return req;
        },
    });
    
    server.applyMiddleware({ app })
    await mongoose.connect('mongodb://localhost:27017/test2', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    app.listen({ port: 4000 }, () => {
        console.log(`server running at http://localhost:4000${server.graphqlPath}`);
    })
}

startServer()