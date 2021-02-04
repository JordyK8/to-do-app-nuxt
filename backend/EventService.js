import axios from "axios"

export default {
  async getTodos() {
    let res = await axios.get("http://localhost:3000/");
    return res.data;
  },
  async putTodoStatus(todoInfo) {
    let res = await axios.put("http://localhost:3000/todos", { todoInfo })
    return res.data;
  },
  async postNewTodo(newTodo) {
    let res = await axios.post("http://localhost:3000/todos", newTodo);

    return res.data;
  },
  async deleteTodo(todo) {
    let res = axios.post("http://localhost:3000/todos/delete", { todo })
    return res.data
  }
}