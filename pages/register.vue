<template>
  <v-container>
      <h1>Register</h1>
      <UserAuthForm 
      :submitForm="registerUser"
      />
  </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm.vue';
import gqls from '../graphql/graphQls'

export default {
  components: { UserAuthForm },
  methods: {
    async registerUser({email, password}) {
      try {
        const user = await this.$apollo.mutate({
          mutation: gqls.createUser,
          variables: {
            email,
            password,
          },
        });
        this.$store.commit('login', user.data.createUser);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },

}
</script>

<style>

</style>