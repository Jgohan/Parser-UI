<template>
  <v-row justify="center">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
          <span class="headline">String parser</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type your string for parsing"
          color="teal"
          v-model.trim="inputString"
          :error-messages="stringError"
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
import { required } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  data () {
    return {
      inputString: ''
    }
  },
  validations: {
    inputString: { required }
  },
  computed: {
    stringError() {
      if (this.$v.inputString.$dirty) {
        if (!this.$v.inputString.required) return "String can\'t be empty";
      }
      return "";
    }
  },
  methods: {
    sendString () {
      if(this.$v.inputString.$invalid) {
        this.$v.inputString.$touch()
        setTimeout(this.$v.inputString.$reset, 5000)
      } else {
        ParserAPI.parseString(this.inputString)
          .then(response => {
            this.$notify({
              group: "notification",
              type: "ok",
              title: "Success",
              text: "String was sent to the server"
            })
          })
          .catch(response => {
            this.$notify({
              group: "notification",
              type: "error",
              title: "Error",
              text: response
            })
          })
        this.inputString = ''
        this.$v.inputString.$reset()
      }
    }
  }
}
</script>
