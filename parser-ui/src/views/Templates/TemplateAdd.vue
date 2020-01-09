<template>
  <v-row justify="center" class="mt-4">
    <v-card class="mt-4 pa-4 d-inline-block" width="80%">
      <v-card-title>
          <span class="headline">Template add</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type the name of your template"
          color="teal"
          v-model.trim="inputTemplateName"
          :error-messages="nameError"
        >
        </v-text-field>
        <v-text-field
          label="Type the string of your template"
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
          @click="addTemplate"
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
import { required } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  data() {
    return {
      inputTemplateName: '',
      inputTemplateString: ''
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
  methods: {
    addTemplate() {
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
        ParserAPI.addTemplate({
          templateName: this.inputTemplateName,
          templateString: this.inputTemplateString
        })
          .then(response => {
            this.$notify({
              group: "notification",
              type: "ok",
              title: "Success",
              text: "Template was added to the database"
            })
            this.$emit('templateAdding')
          })
          .catch(response => {
            this.$notify({
              group: "notification",
              type: "error",
              title: "Error",
              text: response
            })
          })
        this.inputTemplateName = ''
        this.inputTemplateString = ''
        this.$v.inputTemplateName.$reset()
        this.$v.inputTemplateString.$reset()
      }
    }
  }
}
</script>