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

      <v-toolbar-title>Application</v-toolbar-title>
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
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import EventService from '../backend/EventService'
export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data(){
    return{
      drawer: null,
      todos:[],
      newTodo: '',
    }
  },
  computed:{
    test(){
      this.$store.state.test
    }
  },
  created(){
    console.log('Created Triggered');
    this.getTodosData()
  },
  methods:{
    async deleteTodo(todo){
      try{
        await EventService.deleteTodo(todo)
        //locally remove from array
        this.todos.splice(this.todos.indexOf(todo),1)
      }
      catch(e){
        console.log(e);
      }
    },
    async createNewTodo(){
      const newTodo = {
        title: this.newTodo,
        completed: false
      }
      this.newTodo =''
      try{
        console.log('start');
        await EventService.postNewTodo(newTodo)
        console.log('end');
        this.todos.unshift(newTodo)
        //locally push to array
      }
      catch(e){
        console.log(e);
      }
    },
    async changeCompletedStatus(todo){
      try{
        await EventService.putTodoStatus({id:todo._id, currentStatus: todo.completed})
      }
      catch(e){
        console.log(e);
        //revert local change if error
        todo.completed != todo.completed
      }
    },
    async getTodosData(){
      try{
        const data = await EventService.getTodos()
        this.todos = data
      }
      catch(e){
        console.log(e);
      }
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
