import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcrypt';
import Todo from './models/Todo';
import User from './models/User';

const pubsub = new PubSub();

const saltRounds = 8;

const TODO_CREATED = 'TODO_CREATED';
const TODO_UPDATED = 'TODO_UPDATED';
const TODO_DELETED = 'TODO_DELETED';

const resolvers = {

  Subscription: {
    todoCreated: {
      subscribe: () => pubsub.asyncIterator([TODO_CREATED]),
    },
    todoUpdated: {
      subscribe: () => pubsub.asyncIterator([TODO_UPDATED]),
    },
    todoDeleted: {
      subscribe: () => pubsub.asyncIterator([TODO_DELETED]),
    },
  },

  Query: {
    allTodos: () => Todo.find(),
    todos: async (_, { ownerId }) => Todo.find({ ownerId }),
    users: () => User.find(),
  },

  Mutation: {
    createTodo: async (_, { title, ownerId }) => {
      const newTodo = new Todo({ title, completed: false, ownerId });
      await newTodo.save();
      pubsub.publish(TODO_CREATED, { todoCreated: newTodo });
    },

    createUser: async (_, { email, password }) => {
      const newUser = new User({ email, password, admin: true });
      const salt = await bcrypt.genSalt(saltRounds);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      return newUser;
    },

    deleteTodo: async (_, { id }) => {
      const deletedTodo = await Todo.findOneAndDelete({ _id: id });
      pubsub.publish(TODO_DELETED, { todoDeleted: deletedTodo });
    },

    updateTodo: async (_, { id, status }) => {
      const updatedTodo = Todo.findOneAndUpdate({ _id: id },
        { $set: { completed: status } }, { new: true });
      pubsub.publish(TODO_UPDATED, { todoUpdated: updatedTodo });
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    },
  },
};

export default resolvers;
