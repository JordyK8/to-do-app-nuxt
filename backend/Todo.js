import mongoose from 'mongoose'
export const Todo = mongoose.model("Todo", { title: String, completed: Boolean })