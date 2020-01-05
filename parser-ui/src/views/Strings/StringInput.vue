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
          v-model="inputString"
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          elevation="4"
          color="teal"
          dark
          class="ml-2"
          @click="updateString"
        >
          Send string
        </v-btn>
        <span class="ml-8">{{ string }}</span>
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
            that are character sequence without spaces
          </span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import ParserAPI from '@/components/parser-api.js'

export default {
  props: ['string'],
  data () {
    return {
      inputString: ''
    }
  },
  methods: {
    updateString () {
      this.$emit('stringUpdate', this.inputString)
      if(this.inputString) {
        ParserAPI.parseString(this.inputString)
          .then(response => {
            console.log(response)
          })
          .catch(console.log('POST parse string request wasn\'t executed'))
        this.inputString = ''
      }
      else console.log("String can\'t be empty")
    }
  }
}
</script>
