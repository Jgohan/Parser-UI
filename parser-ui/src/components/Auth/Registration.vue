<template>
  <v-card class="pa-4 d-inline-block" width="100%">
    <v-card-title>
      <span class="headline">Registration</span>
    </v-card-title>

    <v-card-text>
      <v-text-field
        label="Type your username"
        color="teal"
        v-model.trim="username"
        :error-messages="usernameError"
      >
      </v-text-field>
      <v-text-field
        label="Type your password"
        type="password"
        color="teal"
        v-model.trim="password"
        :error-messages="passwordError"
      >
      </v-text-field>
      <v-text-field
        label="Confirm your password"
        type="password"
        color="teal"
        v-model.trim="confirmedPassword"
        :error-messages="confirmedPasswordError"
      >
      </v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        elevation="4"
        color="light-blue darken-3"
        dark
        class="ml-2"
        width="80px"
        @click="signUp"
      >
        Sign up
      </v-btn>
      <v-btn
        elevation="4"
        color="teal"
        dark
        class="ml-4"
        width="80px"
        @click="signIn"
      >
        Sign in
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmedPassword: ''
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40)
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(40)
    },
    confirmedPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  computed: {
    usernameError() {
      if (this.$v.username.$dirty) {
        if (!this.$v.username.required) return "Username can\'t be empty"
        if (!this.$v.username.minLength) return "Username must have at least "
          + this.$v.username.$params.minLength.min + " characters"
        if (!this.$v.username.maxLength) return "Username must have no more than "
          + this.$v.username.$params.maxLength.max + " characters, now "
          + this.username.length + " characters"
      }
      return ""
    },
    passwordError() {
      if (this.$v.password.$dirty) {
        if (!this.$v.password.required) return "Password can\'t be empty"
        if (!this.$v.password.minLength) return "Password must have at least "
          + this.$v.password.$params.minLength.min + " characters"
        if (!this.$v.password.maxLength) return "Password must have no more than "
          + this.$v.password.$params.maxLength.max + " characters, now "
          + this.password.length + " characters"
      }
      return ""
    },
    confirmedPasswordError() {
      if (this.$v.confirmedPassword.$dirty) {
        if (!this.$v.confirmedPassword.required) return "Confirmed password can\'t be empty"
        if (!this.$v.confirmedPassword.sameAsPassword) return "Passwords don't match"
      }
      return ""
    }
  },
  methods: {
    signUp() {
      const isUsernameInvalid = this.$v.username.$invalid
      const isPasswordInvalid = this.$v.password.$invalid
      const isConfirmedPasswordInvalid = this.$v.confirmedPassword.$invalid
      if (isUsernameInvalid || isPasswordInvalid || isConfirmedPasswordInvalid) {
        if (isUsernameInvalid) {
          this.$v.username.$touch()
          setTimeout(this.$v.username.$reset, 5000)
        } 
        if (isPasswordInvalid) {
          this.$v.password.$touch()
          setTimeout(this.$v.password.$reset, 5000)
        }
        if (isConfirmedPasswordInvalid) {
          this.$v.confirmedPassword.$touch()
          setTimeout(this.$v.confirmedPassword.$reset, 5000)
        }
      } else {
        const newUser = {
          username: this.username,
          password: this.password
        }
        ParserAPI.signUp(newUser)
        .then(response => {
          this.$notify({
            group: "notification",
            type: "ok",
            title: "Success",
            text: "You have been registered"
          })
        })
        .catch(error => {
          var message = error
          if (error.response.data.text) message = error.response.data.text
          this.$notify({
            group: "notification",
            type: "error",
            title: "Error",
            text: message
          })
        })
        this.username = ''
        this.password = ''
        this.confirmedPassword = ''
        this.$v.username.$reset()
        this.$v.password.$reset()
        this.$v.confirmedPassword.$reset()
        this.$emit("toLogin")
      }
    },
    signIn() {
      this.$emit("toLogin")
    }
  }
}
</script>
