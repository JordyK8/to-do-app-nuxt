const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
})

module.exports.Todo = mongoose.model('Todo', todoSchema)