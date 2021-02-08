<template>
  <v-app id="inspire">
    <v-main class="black lighten-2">

      <div v-if="user.id">
        <h3>Welcome {{ user.email }}</h3>
        <div>
          <v-text-field
            v-model="newTodo"
            placeholder="New todo item"
          ></v-text-field>
          <v-btn @click="createNewTodo">Submit</v-btn>
        </div>
        <v-list>
          <v-list-item-group v-if="todos.length > 0">
            <v-list-item v-for="(todo, i) in todos" :key="i">
              <template>
                <v-list-item-action>
                  <v-checkbox v-model="todo.completed"@click="changeCompletedStatus(todo)">
                  </v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :class="{ done: todo.completed }">
                    {{ todo.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn fab ripple small color="red" v-if="todo.completed" @click="deleteTodo(todo)">
                  <v-icon class="white--text">mdi-close</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>

      <div v-else>
        <h1>Please login to see your Todo's</h1>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import all the gql queries and mutations
import gql from 'graphql-tag';
import gqls from '../graphql/graphQls';

const SUBSCRIPTION_TODO_CREATED = gql`
subscription {
  todoCreated {
    id
    title
    ownerId
    completed
  }
}
`;

export default {
  apollo: {
    $subscribe: {
      todos: {
        query: SUBSCRIPTION_TODO_CREATED,
        result(data) {
          this.todos.unshift(data.data.todoCreated);
        },
      },
    },
  },
  // Get all todos for logedin user on pagelcreation
  async created() {
    const ownerId = this.$store.state.user.id;
    try {
      const todos = await this.$apollo.query({
        query: gqls.getTodo,
        variables: {
          ownerId,
        },
      });
      this.todos = todos.data.todos;
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async createNewTodo() {
      const title = this.newTodo;
      const ownerId = this.$store.state.user.id;
      this.newTodo = '';
      try {
        const createdTodo = await this.$apollo.mutate({
          mutation: gqls.createTodo,
          variables: {
            title,
            ownerId,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },

    async deleteTodo(todo) {
      try {
        await this.$apollo.mutate({
          mutation: gqls.deleteTodo,
          variables: {
            id: todo.id,
          },
        });
        this.todos.splice(this.todos.indexOf(todo), 1);
      } catch (e) {
        console.log(e);
      }
    },

    async changeCompletedStatus(todo) {
      let updatedTodo;
      try {
        updatedTodo = await this.$apollo.mutate({
          mutation: gqls.updateTodo,
          variables: {
            status: todo.completed,
            id: todo.id,
          },
        });
      } catch (e) {
        console.log(e);
        todo.completed = updatedTodo.data.updatedTodo.completed;
      }
    },
  },
};
</script>
<style scoped>
.done {
  text-decoration: line-through;
}

</style>
