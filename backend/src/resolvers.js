import { Todo } from './models/Todo'
import { User } from './models/User'
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
                return newTodo
            } catch (e) {
                console.log(e);
             }
        },
        createUser: async(_, { email, password }) => {
            const newUser = new User({ email, password, admin: true })
            try {
                await newUser.save()
                console.log(newUser);
                return newUser
            } catch (e) {
                console.log(e);
             }
        },
        deleteTodo: async (_, { id }) => {
            try {
                const deletedTodo = await Todo.findOneAndDelete({ _id: id })
                console.log(deletedTodo);
                return deletedTodo
            } catch (e) {
                console.log(e);
            }
        },
        updateTodo: async (_, { id, status }) => {
            const filter = {_id: id}
            try {
                const todoToUpdate = await Todo.findOneAndUpdate(filter, {$set:{ completed: status }},{new: true})
                return todoToUpdate
            } catch (e) {
                console.log(e);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email })
                console.log(user.password , password);
                if (user.password === password) { return user }
                else { return null }
            } catch (e) {
                console.log(e);
            }
        }

    }
}

//const kitty = new Cat ({name: "Zildjian"})
//kitty.save().then() => console.log("meow")