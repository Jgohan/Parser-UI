<template>
  <v-card class="pa-4 d-inline-block" width="100%">
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>

    <v-card-text>
      <v-text-field
        label="Enter username"
        color="teal"
        v-model.trim="username"
        :error-messages="usernameError"
        @keyup.enter="signIn"
      >
      </v-text-field>
      <v-text-field
        label="Enter password"
        type="password"
        color="teal"
        v-model.trim="password"
        :error-messages="passwordError"
        @keyup.enter="signIn"
      >
      </v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        elevation="4"
        color="teal"
        dark
        class="ml-2"
        width="80px"
        @click="signIn"
      >
        Sign in
      </v-btn>
      <v-btn
        elevation="4"
        color="light-blue darken-3"
        dark
        class="ml-4"
        width="80px"
        @click="signUp"
      >
        Sign up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    usernameError() {
      if (this.$v.username.$dirty) {
        if (!this.$v.username.required) return "Username can\'t be empty"
      }
      return ""
    },
    passwordError() {
      if (this.$v.password.$dirty) {
        if (!this.$v.password.required) return "Password can\'t be empty"
      }
      return ""
    }
  },
  methods: {
    signIn() {
      const isUsernameInvalid = this.$v.username.$invalid
      const isPasswordInvalid = this.$v.password.$invalid
      if (isUsernameInvalid || isPasswordInvalid) {
        if (isUsernameInvalid) {
          this.$v.username.$touch()
          setTimeout(this.$v.username.$reset, 5000)
        } 
        if (isPasswordInvalid) {
          this.$v.password.$touch()
          setTimeout(this.$v.password.$reset, 5000)
        }
      } else {
        const newUser = {
          username: this.username,
          password: this.password
        }
        ParserAPI.signIn(newUser)
        .then(response => {
          var payload = JSON.parse(
            window.atob(response.data.split('.')[1])
          )
          this.$store.dispatch(
            'login',
            {
              'token': response.data,
              'username': payload.sub,
              'role': payload.role
            }
          )
        })
        .catch(error => {
          var message = error
          if (error.response.data) message = error.response.data
          this.$notify({
            group: "notification",
            type: "error",
            title: "Error",
            text: message
          })
        })
        this.username = ''
        this.password = ''
        this.$v.username.$reset()
        this.$v.password.$reset()
      }
    },
    signUp() {
      this.$emit('toRegistration')
    }
  }
}
</script>
