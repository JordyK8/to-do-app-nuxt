<template>
  <v-container>
      <h1>Login</h1>
      <UserAuthForm 
      :submitForm="loginUser"/>
  </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
export default {
    components:{UserAuthForm},
    methods:{
        async loginUser(loginInfo){
            try{
                let res = this.$auth.loginWith('local',{
                        data: loginInfo
                    })
                console.log(res);
            }catch(e){
                console.log(e);
            }
            // alert('login')
        }
    }

}
</script>

<style>

</style>