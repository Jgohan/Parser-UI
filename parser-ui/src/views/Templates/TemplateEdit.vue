<template>
  <v-row justify="center" class="mt-4">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
          <span class="headline">Template edit</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type id of template"
          color="teal"
          type="number"
          v-model="inputTemplateId"
        >
        </v-text-field>
        <v-text-field
          label="Type a new name of template"
          color="teal"
          v-model="inputTemplateName"
        >
        </v-text-field>
        <v-text-field
          label="Type a new string of template"
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
          Edit template
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
            Tip
          </span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: ['selectedTemplate'],
  data() {
    return {
      inputTemplateId: this.selectedTemplate.id,
      inputTemplateName: this.selectedTemplate.templateName,
      inputTemplateString: this.selectedTemplate.templateString
    }
  },
  methods: {
    updateString () {
      this.inputTemplateId = this.selectedTemplate.id
      this.inputTemplateName = this.selectedTemplate.templateName
      this.inputTemplateString = this.selectedTemplate.templateString
      console.log(this.selectedTemplate)
    }
  }
}
</script>