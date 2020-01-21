<template>
  <v-row justify="center">
    <v-card class="pa-4" width="100%">
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
            sortable: false,
            value: 'templateString'
          }
        ]
    }
  },
  methods: {
    selectTemplate(template) {
      this.$emit('templateSelect', template)
    },
  },
  created() {
    this.$emit('templatesUpdate')    
  }
}
</script>
