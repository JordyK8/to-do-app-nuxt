<template>
  <v-container>
      <h1>Login</h1>
      <UserAuthForm 
      :submitForm="loginUser"/>
  </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
import USER from '../graphql/User.gql'
export default {
    components:{UserAuthForm},
    methods:{
        async loginUser({email, password}){
            try{
                const user = await this.$apollo.mutate({
                    mutation: USER,
                    variables:{
                        email,
                        password
                    }
                })
                this.$store.commit('login', user)
            }catch(e){
                console.log(e);
            }
            // alert('login')
        }
    },
}
</script>

<style>

</style>