import { Todo } from './models/Todo'
export const resolvers = {
    Query: {
        todos: () => Todo.find()
    },
    Mutation: {
        createTodo: async(_, { title}) => {
            const newTodo = new Todo({ title, completed: false })
            try {
                await newTodo.save()
                console.log(newTodo);
                return newTodo
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
        }

    }
}

//const kitty = new Cat ({name: "Zildjian"})
//kitty.save().then() => console.log("meow")