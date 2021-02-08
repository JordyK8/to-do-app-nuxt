import { gql } from 'apollo-server-core';

const typeDefs = gql`

  type Subscription {
    todoCreated: Todo!
    todoUpdated: Todo!
    todoDeleted: Todo!
  }

  type Query {
    allTodos: [Todo!]!
    todos(ownerId:ID!):[Todo!]
    users: [User!]!
    user(id:ID!): User
  }
  type User {
    id:ID!
    email: String!
    password: String!
    admin: Boolean!
  }
  type Todo {
    id:ID!
    title: String!
    completed: Boolean!
    ownerId: ID!
  }
  type Mutation {
    login(email: String!, password:String!): User

    createTodo(title: String!, ownerId:ID!): Todo!
    createUser(email: String!, password: String!): User!
        
    deleteTodo(id: ID!): Todo!
    deleteUser(id: ID!): User!

    updateTodo(id: ID!,status:Boolean!): Todo!
    updateUser(id: ID!, password: String!, newPassword: String!): Todo!
  }

`;

export default typeDefs;
