<template>
  <v-row justify="center" class="mt-4">
    <v-card class="ma-4 pa-4" width="80%">
      <v-card-title>
        <span class="headline">Templates</span>
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
        :headers="headers"
        :items="templates"
        :items-per-page="5"
        :search="search"
        @click:row="selectTemplate"
        calculate-widths
      ></v-data-table>
    </v-card>
  </v-row>
</template>

<script>
import ParserAPI from '@/components/parser-api.js'

export default {
  props: ['templates'],
  data () {
    return {
      search: '',
      headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'templateName'
          },
          { 
            text: 'String',
            align: 'start',
            value: 'templateString'
          }
        ]
    }
  },
  methods: {
    selectTemplate(template) {
      console.log(template)
      this.$emit('templateSelect', template)
    },
  },
  created: function () {
    ParserAPI.getAllTemplates()
      .then(response => 
        this.$emit('templatesUpdate', response.data)
      )
      // .catch(console.log('GET templates request wasn\'t executed'))
  }
}
</script>
