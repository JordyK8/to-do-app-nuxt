<template>
  <v-app dark>
    <v-app-bar app>
      <v-btn text to="/">Home</v-btn>
      <v-spacer/>
      <div v-if="user.id">
        {{user.email}}
        <v-btn @click="logout">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import error from './error.vue';
export default {
  components: { error },
  computed: {
    user() {
      return this.$store.state.user ? this.$store.state.user : 'Please login first!';
    },
  },
  data() {
    return {
      title: 'Vuetify.js',
    };
  },

  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
  },
};
</script>
