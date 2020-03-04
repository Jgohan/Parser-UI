<template>
  <v-row justify="center">
    <v-card class="pa-4 d-inline-block" width="100%">
      <v-card-title>
          <span class="headline">Parse string</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type your string for parsing"
          color="teal"
          v-model.trim="inputString"
          :error-messages="stringError"
          @keyup.enter="sendString"
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          elevation="4"
          color="teal"
          dark
          class="ml-2"
          @click="sendString"
        >
          Send string
        </v-btn>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              class="headline font-weight-medium"
              v-on="on"
            >
              ?
            </v-btn>
          </template>
          <span>
            String must follow a certain template<br>
            and contain attributes (instead of _att_)<br>
            that are character sequence without spaces<br>
            and they must be surrounded by spaces
          </span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  props: ['selectedTemplate'],
  data() {
    return {
      inputString: ''
    }
  },
  validations: {
    inputString: {
      required,
      maxLength: maxLength(100)
    }
  },
  computed: {
    stringError() {
      if (this.$v.inputString.$dirty) {
        if (!this.$v.inputString.required) return "String can\'t be empty"
        if (!this.$v.inputString.maxLength) return "String must have no more than "
          + this.$v.inputString.$params.maxLength.max + " characters, now "
          + this.inputString.length + " characters"
      }
      return ""
    }
  },
  methods: {
    sendString () {
      if (this.$v.inputString.$invalid) {
        this.$v.inputString.$touch()
        setTimeout(this.$v.inputString.$reset, 5000)
      } else {
        ParserAPI.parseString(
          this.$store.getters.getToken,
          this.inputString
        )
        .then(response => {
          this.$notify({
            group: "notification",
            type: "ok",
            title: "Success",
            text: "String was sent to the server"
          })
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
        this.inputString = ''
        this.$v.inputString.$reset()
        this.$emit('templateUnselecting')
      }
    }
  },
  watch: {
    selectedTemplate() {
      if (this.selectedTemplate)
        this.inputString = this.selectedTemplate.templateString
    }
  }
}
</script>
