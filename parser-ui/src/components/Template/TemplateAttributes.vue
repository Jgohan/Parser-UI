<template>
  <v-row justify="center">
    <v-card class="pa-4" width="100%">
      <v-card-title>
        <span class="headline">
          {{ template.templateName }} attributes
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          hide-details
          single-line
          color="teal"
          class="pr-4"
        ></v-text-field>
      </v-card-title>
      
      <v-data-table
        v-if="isDataReady"
        :headers="headers"
        :items="messages"
        :items-per-page="5"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-row>
</template>

<script>
import ParserAPI from '@/components/parser-api.js'

export default {
  props: ['template'],
  data() {
    return {
      messages: [],
      isDataReady: false,
      search: ''
    }
  },
  computed: {
    headers() {
      var headers = []

      if (this.messages.length) {
        headers.push({
          text: 'Author name',
          align: 'start',
          sortable: true,
          value: 'author.username'
        })
  
        for (var i = 0; i < this.messages[0].attributes.length; i++) {
          headers.push({
            text: this.messages[0].attributes[i].position,
            align: 'start',
            sortable: true,
            value: 'attributes[' + i + '].value'
          })
        }

        headers.push({
          text: 'Creation time',
          align: 'start',
          sortable: true,
          value: 'creationTime',
          width: '20%'
        })
      }
      return headers
    }
  },
  created() {
    ParserAPI.getMessages(
      this.$store.getters.getToken,
      this.template.id
    )
    .then(response => {
      this.messages = response.data
      for (var i = 0; i < this.messages.length; i++) {
        var date = new Date(Date.parse(this.messages[i].creationTime))
        this.messages[i].creationTime = date.toLocaleString()
      }
      this.isDataReady = true
    })
    .catch(error => {
      this.$notify({
        group: "notification",
        type: "error",
        title: "Error",
        text: error
      })
    })
  }
}
</script>
