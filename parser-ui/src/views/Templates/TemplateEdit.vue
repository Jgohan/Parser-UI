<template>
  <v-row justify="center" class="mt-4">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
        <span class="headline">Template edit</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          large
          class="mx-n4"
          @click="closeCard"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type new name of template"
          color="teal"
          v-model.trim="inputTemplateName"
          :error-messages="nameError"
        >
        </v-text-field>
        <v-text-field
          label="Type new string of template"
          color="teal"
          v-model.trim="inputTemplateString"
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
          @click="updateTemplate"
        >
          Edit template
        </v-btn>
        <v-btn
          elevation="4"
          color="red darken-1"
          dark
          class="ml-8"
          @click="deleteTemplate"
        >
          Delete template
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
            the same number of attributes (_att_)<br>
            that must be surrounded by spaces
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
  props: ['selectedTemplate'],
  data() {
    return {
      inputTemplateId: this.selectedTemplate.id || '',
      inputTemplateName: this.selectedTemplate.templateName || '',
      inputTemplateString: this.selectedTemplate.templateString || ''
    }
  },
  validations: {
    inputTemplateName: { required },
    inputTemplateString: { required }
  },
  computed: {
    nameError() {
      if (this.$v.inputTemplateName.$dirty) {
        if (!this.$v.inputTemplateName.required) return "Name can\'t be empty";
      }
      return "";
    },
    stringError() {
      if (this.$v.inputTemplateString.$dirty) {
        if (!this.$v.inputTemplateString.required) return "String can\'t be empty";
      }
      return "";
    }
  },
  watch: {
    selectedTemplate() {
      this.inputTemplateId = this.selectedTemplate.id
      this.inputTemplateName = this.selectedTemplate.templateName
      this.inputTemplateString = this.selectedTemplate.templateString
    }
  },
  methods: {
    updateTemplate () {
      const isNameInvalid = this.$v.inputTemplateName.$invalid
      const isStringInvalid = this.$v.inputTemplateString.$invalid
      if(isNameInvalid || isStringInvalid) {
        if(isNameInvalid) {
          this.$v.inputTemplateName.$touch()
          setTimeout(this.$v.inputTemplateName.$reset, 5000)
        } 
        if(isStringInvalid) {
          this.$v.inputTemplateString.$touch()
          setTimeout(this.$v.inputTemplateString.$reset, 5000)
        }
      } else {
        ParserAPI.editTemplate(
          this.$store.getters.getToken,
          {
            id: this.selectedTemplate.id,
            templateName: this.inputTemplateName,
            templateString: this.inputTemplateString
          }
        )
        .then(response => {
          this.$notify({
            group: "notification",
            type: "ok",
            title: "Success",
            text: "Template was edited"
          })
          this.$emit('templateUpdate')
        })
        .catch(response => {
          this.$notify({
            group: "notification",
            type: "error",
            title: "Error",
            text: response
          })
        })
      }
    },
    deleteTemplate() {
      ParserAPI.deleteTemplate(
        this.$store.getters.getToken,
        this.selectedTemplate.id
      )
      .then(response => {
        this.$notify({
          group: "notification",
          type: "ok",
          title: "Success",
          text: "Template was deleted"
        })
        this.$emit('templateUpdate')
      })
      .catch(response => {
        this.$notify({
          group: "notification",
          type: "error",
          title: "Error",
          text: response
        })
      })
    },
    closeCard() {
      this.$emit('editCardClosing')
    }
  }
}
</script>