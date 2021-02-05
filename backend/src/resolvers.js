import { Error } from 'mongoose';
import { Todo } from './models/Todo'
import { User } from './models/User'
import bcrypt from 'bcrypt'
const saltRounds = 8


export const resolvers = {
    Query: {
        allTodos: () => Todo.find(),
        todos: async(_, { ownerId }) => {
            const foundTodos = await Todo.find({ ownerId: ownerId })
            console.log(foundTodos);
            return foundTodos
        },
        users: (parent, args, context) => {
            // if (!context.user || !context.user.admin) return null;
            return User.find();
        },

    },
    Mutation: {
        createTodo: async(_, { title, ownerId}) => {
            const newTodo = new Todo({ title, completed: false, ownerId })
            try {
                await newTodo.save()
                console.log(newTodo);
            } catch (e) {
                console.log(e);
            }
            return newTodo
        },
        
        createUser: async (_, { email, password }) => {
            const newUser = new User({ email, password, admin: true })
            try {
                const salt = await bcrypt.genSalt(saltRounds)
                newUser.password = await bcrypt.hash(password, salt)
                await newUser.save()
                console.log(newUser);
            } catch (e) {
                console.log(e);
            }
            return newUser
        },

        deleteTodo: async (_, { id }) => {
            try {
                const deletedTodo = await Todo.findOneAndDelete({ _id: id })
                console.log(deletedTodo);
            } catch (e) {
                console.log(e);
            }
            return deletedTodo
        },
        updateTodo: async (_, { id, status }) => {
            const filter = {_id: id}
            try {
                const todoToUpdate = await Todo.findOneAndUpdate(filter, {$set:{ completed: status }},{new: true})
            } catch (e) {
                console.log(e);
            }
            return todoToUpdate
        },
        login: async (_, { email, password }) => {
            let user
            try {
                user = await User.findOne({ email })
                if (!await bcrypt.compare(password, user.password)) throw new Error('Login unsuccesfull')
            } catch (e) {
                console.log(e);
            }
            return user
        }

    }
}

//const kitty = new Cat ({name: "Zildjian"})
//kitty.save().then() => console.log("meow")