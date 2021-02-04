<template>
  <v-container>
      <h1>Register</h1>
      <UserAuthForm 
      :submitForm="registerUser"
      :hasName="true"/>
  </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
export default {
    auth:false,
    components:{UserAuthForm},
    methods:{
        registerUser(registrationInfo){
            alert('register')
        }
    }

}
</script>

<style>

</style>