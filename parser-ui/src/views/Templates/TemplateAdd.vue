<template>
  <v-row justify="center" class="mt-4">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
          <span class="headline">Template add</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type a name of your template"
          color="teal"
          v-model="inputTemplateName"
        >
        </v-text-field>
        <v-text-field
          label="Type a string of your template"
          color="teal"
          v-model="inputTemplateString"
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
          Add template
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
            Template must contain<br>
            at least one attribute (_att_)<br>
            that must be surrounded by spaces
          </span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      inputTemplateName: '',
      inputTemplateString: ''
    }
  },
  methods: {
    updateString () {
      console.log("Template was added")
    }
  }
}
</script>