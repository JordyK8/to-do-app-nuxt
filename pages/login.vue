<template>
  <v-container>
      <h1>Login</h1>
      <UserAuthForm
      :submitForm="loginUser"/>
  </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm.vue';
import gqls from '../graphql/graphQls';

export default {
  components: { UserAuthForm },
  methods: {
    async loginUser({ email, password }) {
      try {
        const user = await this.$apollo.mutate({
          mutation: gqls.getUser,
          variables: {
            email,
            password,
          },
        });
        this.$store.commit('login', user.data.login);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
