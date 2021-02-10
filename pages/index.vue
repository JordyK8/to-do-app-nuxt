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
          <v-btn :disabled="newTodo.length < 2" @click="createNewTodo"
            >Submit</v-btn
          >
        </div>
        <v-list class="mt-6">
          <v-list-item-group v-if="todos.length > 0">
            <v-list-item v-for="(todo, i) in todos" :key="i">
              <template>
                <v-list-item-action>
                  <v-checkbox
                    v-model="todo.completed"
                    @click="changeCompletedStatus(todo)"
                  >
                  </v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :class="{ done: todo.completed }">
                    {{ todo.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn
                  fab
                  ripple
                  small
                  color="red"
                  v-if="todo.completed"
                  @click="deleteTodo(todo)"
                >
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
import gqls from "../graphql/graphQls";

export default {
  apollo: {
    $subscribe: {
      createdTodos: {
        query: gqls.subscriptionTodoCreated,
        result(data) {
          if (data.data.todoCreated.ownerId === this.$store.state.user.id) {
            this.todos.unshift(data.data.todoCreated);
          } else {
            console.log("Todo created by someone else!");
          }
        }
      },

      deletedTodos: {
        query: gqls.subscriptionTodoDeleted,
        result(data) {
          if (data.data.todoDeleted.ownerId === this.$store.state.user.id) {
            const todoIndex = this.todos.findIndex(
              todo => todo.id === data.data.todoDeleted.id
            );
            this.todos.splice(todoIndex, 1);
          } else {
            console.log("Todo deleted by someone else!");
          }
        }
      },

      updatedTodos: {
        query: gqls.subscriptionTodoUodated,
        result(data) {
          if (data.data.todoUpdated.ownerId === this.$store.state.user.id) {
            const todoIndex = this.todos.findIndex(
              todo => todo.id === data.data.todoUpdated.id
            );
            this.todos[todoIndex].completed = data.data.todoUpdated.completed;
          } else {
            console.log("Todo updated by someone else!");
          }
        }
      }
    }
  },
  // Get all todos for logedin user on page creation
  async created() {
    const ownerId = this.$store.state.user.id;
    try {
      const todos = await this.$apollo.query({
        query: gqls.getTodo,
        variables: {
          ownerId
        }
      });
      this.todos = todos.data.todos.reverse();
    } catch (e) {
      console.log(e);
    }
  },

  data() {
    return {
      todos: [],
      newTodo: ""
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    async createNewTodo() {
      const title = this.newTodo;
      const ownerId = this.$store.state.user.id;
      this.newTodo = "";
      try {
        await this.$apollo.mutate({
          mutation: gqls.createTodo,
          variables: {
            title,
            ownerId
          }
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
            id: todo.id
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    async changeCompletedStatus(todo) {
      try {
        await this.$apollo.mutate({
          mutation: gqls.updateTodo,
          variables: {
            status: todo.completed,
            id: todo.id
          }
        });
      } catch (e) {
        console.log(e);
        todo.completed = !todo.completed;
      }
    }
  }
};
</script>
<style scoped>
.done {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}
</style>
