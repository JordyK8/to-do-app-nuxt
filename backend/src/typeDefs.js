import { gql } from 'apollo-server-core' 
export const typeDefs = gql`

    type Query {
        todos: [Todo!]!
    }
    type Todo {
        id:ID!
        title: String!
        completed: Boolean!
    }
    type Mutation {
        createTodo(title: String!): Todo!
        deleteTodo(id: ID!): Todo!
        updateTodo(id: ID!,status:Boolean!): Todo!
    }

`;