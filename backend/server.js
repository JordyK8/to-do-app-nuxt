const express = require('express')
const app = express()
const cors = require('cors')
const dbConnect = require('./db')
const { Todo } = require('./models/Todo')

//GRAPHQL 
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`

    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
    }

    type Query {
        todos:[Todo]
    }
    type Mutation {
        newTodo: UpdateTodos
        deleteTodo: UpdateTodos
        updateTodo(todoId:ID!): UpdateTodos
    }
    type UpdateTodos {
        success: Boolean!
        message: String
        todos: [Todo]
    }
`;

const server = new ApolloServer({ typeDefs });
server.listen(5000).then(({url}) => {
  console.log(`
    Server is running!
    Listening on port ${url} hoeaa
    Explore at https://studio.apollographql.com/dev
  `);
});


// END GRAPHQL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

dbConnect()

app.get('/', async (req, res, next) => {
    const todos = await Todo.find()
    console.log(todos);
    res.send(todos)
})
app.put('/todos', async (req, res, next) => {
    const todoInfo = req.body.todoInfo
    const update = { completed: todoInfo.currentStatus }
    const filter = { _id: todoInfo.id }
    let updatedTodo = await Todo.findOneAndUpdate(filter, update)
    console.log(updatedTodo.completed);
})

app.post('/todos', async (req, res, next) => {
    const newTodo = new Todo(req.body)
    await newTodo.save()
    res.send('ok')
    
})

app.post('/todos/delete', async (req, res, next) => {
    const todoId = req.body.todo._id
    try {
        await Todo.deleteOne({ _id: todoId })
    } catch (e) {
        console.log(e);
    }
})
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})