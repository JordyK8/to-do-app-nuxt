import mongoose from 'mongoose';

const Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean,
  ownerId: String,
});

export default Todo;
