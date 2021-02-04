<template>
  <v-form v-model="valid">
      <v-text-field
        v-model="userInfo.name"
        label="Name"
        :rules="nameRules"
        required
        v-if="hasName"
      />
      <v-text-field
        v-model="userInfo.email"
        label="Email"
        :rules="emailRules"
        required
      />
      <v-text-field
        v-model="userInfo.password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :rules="passwordRules"
        required
      />
      <v-btn
        @click="submitForm(userInfo)"
        :disabled="!valid"
      >Submit</v-btn>
  </v-form>
</template>

<script>
export default {
    props:['submitForm', 'hasName'],

    data(){
    return{
        valid: false,
        showPassword: false,
        userInfo: {
            email: '',
            password: '',
            name:''
        },
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 2 || 'Password must contain more than 2 characters',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length >= 2 || 'Name must contain more than 2 characters',
        ],
            
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        }
    
}
}
</script>

<style>

</style>