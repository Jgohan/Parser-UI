<template>
  <v-row justify="center" class="mt-4">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Enter username"
          color="teal"
          v-model.trim="username"
          :error-messages="usernameError"
        >
        </v-text-field>
        <v-text-field
          label="Enter password"
          type="password"
          color="teal"
          v-model.trim="password"
          :error-messages="passwordError"
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          elevation="4"
          color="teal"
          dark
          class="ml-2"
          @click="signIn"
        >
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
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
        if (!this.$v.username.required) return "Username can\'t be empty";
      }
      return "";
    },
    passwordError() {
      if (this.$v.password.$dirty) {
        if (!this.$v.password.required) return "Password can\'t be empty";
      }
      return "";
    }
  },
  methods: {
    signIn() {
      const isUsernameInvalid = this.$v.username.$invalid
      const isPasswordInvalid = this.$v.password.$invalid
      if(isUsernameInvalid || isPasswordInvalid) {
        if(isUsernameInvalid) {
          this.$v.username.$touch()
          setTimeout(this.$v.username.$reset, 5000)
        } 
        if(isPasswordInvalid) {
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
          this.$store.dispatch(
            'login',
            {
              'username': response.data.username,
              'token': response.data.token,
              'authorities': response.data.authorities
            }
          );
          console.log(response)
        })
        .catch(response => {
          this.$notify({
            group: "notification",
            type: "error",
            title: "Error",
            text: response
          })
        })
        this.username = ''
        this.password = ''
        this.$v.username.$reset()
        this.$v.password.$reset()
      }
    }
  }
}
</script>
