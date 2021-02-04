<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
<v-spacer/>
      <div v-if="$auth.loggedIn">
        {{$auth.user.email}}
        <v-btn>Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
         <v-btn text to="/register">Register</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >

      <!--  -->
    </v-navigation-drawer>

    <v-main class="black lighten-2">
      <div>
        <v-text-field
      v-model="newTodo"
    ></v-text-field>
        <v-btn @click="createNewTodo">Submit</v-btn>
      </div>
          <v-row class="todoList" v-for="(todo,i) in todos" :key="i">
            <v-col :class="{'linethrough': todo.completed}">
              <div>
                  <v-checkbox
                
                  class="beforeTitle"
                  :label="todo.title"
                    v-model="todo.completed"
                    @click="changeCompletedStatus(todo)"
                  ></v-checkbox>
              </div>
            </v-col>
          <v-col><v-icon @click="deleteTodo(todo)" class="delete-icon"  color="red" >mdi-delete</v-icon></v-col>
        </v-row>
    </v-main>
  </v-app>
</template>




<script>
import gql from 'graphql-tag'
import TODO_CREATE from '../graphql/TodoCreate.gql'
import TODO_DELETE from '../graphql/TodoDelete.gql'
import TODO_UPDATE from '../graphql/TodoUpdate.gql'
export default {
  auth: false,
  apollo: {
    todos: gql`
      query getTodos{
        todos{
          id
          title
          completed
        }
      }
    `,
  },
  data(){
    return{
      drawer: null,
      todos:[],
      newTodo: '',
    }
  },
  methods:{
    async deleteTodo(todo){
      try{
        await this.$apollo.mutate({
          mutation: TODO_DELETE,
          variables:{
            id:todo.id
          }
        })
        //locally remove from array
        this.todos.splice(this.todos.indexOf(todo),1)
      }
      catch(e){
        console.log(e);
      }
    },
    async createNewTodo(){
      const title = this.newTodo
      this.newTodo =''
      try{
        const createdTodo = await this.$apollo.mutate({
          mutation: TODO_CREATE,
          variables:{
            title
          }
        })
        // I stil need to get back the created todo so the _id field is set in case you want to delete beffore refeshing the page!!
        console.log(createdTodo);
        this.todos.unshift({title: title, completed: false})
      }
      catch(e){
        console.log(e);
      }
    },
    async changeCompletedStatus(todo){
      console.log(typeof todo.completed);
      try{
        const updatedTodo = await this.$apollo.mutate({
          mutation: TODO_UPDATE,
          variables:{
            status: todo.completed,
            id:todo.id  
          }
        })
        console.log(updatedTodo);
      }
      catch(e){
        console.log(e);
        //revert local change if error
        todo.completed != todo.completed
      }
    },
    async getTodosData(){
    //   try{
    //     const data = await EventService.getTodos()
    //     this.todos = data
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // }
  }
  }
}
</script>
<style scoped>
.todoList{
  color: black;
  width: 80vw;
  margin:20px 100px;
}
.linethrough{
  text-decoration: line-through;
  text-decoration-color: white;
  text-decoration-thickness: 2px;
  margin-top: -20px;
}

</style>
