<template>
  <v-row justify="center">
    <v-card class="pa-4 d-inline-block" width="100%">
      <v-card-title>
          <span class="headline">Add template</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Type the name of your template"
          color="teal"
          v-model.trim="inputTemplateName"
          :error-messages="nameError"
          @keyup.enter="addTemplate"
        >
        </v-text-field>
        <v-text-field
          label="Type the string of your template"
          color="teal"
          v-model.trim="inputTemplateString"
          :error-messages="stringError"
          @keyup.enter="addTemplate"
        >
        </v-text-field>
        <attribute-input
          v-for="(attribute, index) in attributes"
          :key="index"
          :index="index"
          :isButtonPressed="isButtonPressed"
          @attributeNameAdding="addAttributeName"
          @attributeNameValidation="checkAttributeName"
          @ButtonUp="releaseButton"
          @templateAdding="addTemplate"
        />
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
import { required, maxLength } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'
import AttributeInput from '@/components/Template/AttributeInput.vue'

export default {
  components: {
    AttributeInput
  },
  data() {
    return {
      inputTemplateName: '',
      inputTemplateString: '',
      attributes: [],
      invalidAttributes: [],
      isButtonPressed: false,
      isAttributeNameInvalid: true
    }
  },
  validations: {
    inputTemplateName: {
      required,
      maxLength: maxLength(40)
    },
    inputTemplateString: {
      required,
      maxLength: maxLength(100)
    }
  },
  computed: {
    nameError() {
      if (this.$v.inputTemplateName.$dirty) {
        if (!this.$v.inputTemplateName.required) return "Name can\'t be empty"
        if (!this.$v.inputTemplateName.maxLength) return "Name must have no more than "
          + this.$v.inputTemplateName.$params.maxLength.max + " characters, now "
          + this.inputTemplateName.length + " characters"
      }
      return ""
    },
    stringError() {
      if (this.$v.inputTemplateString.$dirty) {
        if (!this.$v.inputTemplateString.required) return "String can\'t be empty"
        if (!this.$v.inputTemplateString.maxLength) return "String must have no more than "
          + this.$v.inputTemplateString.$params.maxLength.max + " characters, now "
          + this.inputTemplateString.length + " characters"
      }
      return ""
    }
  },
  watch: {
    inputTemplateString() {
      var attributesNumber = this.inputTemplateString.split('_att_').length - 1
      this.attributes = []
      this.invalidAttributes = []
      for (var i = 0; i < attributesNumber; i++) {
        this.attributes.push('')
        this.invalidAttributes.push(true)
      }
    }
  },
  methods: {
    addAttributeName(attributeName, index) {
      this.attributes[index] = attributeName
    },
    checkAttributeName(isAttributeNameInvalid, index) {
      this.invalidAttributes[index] = isAttributeNameInvalid
      if (this.invalidAttributes.indexOf(true) === -1) {
        this.isAttributeNameInvalid = false
      } else {
        this.isAttributeNameInvalid = true
      }
    },
    releaseButton(index) {
      if (index === this.attributes.length - 1) {
        this.isButtonPressed = false
      }
    },
    addTemplate() {
      this.isButtonPressed = true
      const isNameInvalid = this.$v.inputTemplateName.$invalid
      const isStringInvalid = this.$v.inputTemplateString.$invalid
      if (isNameInvalid || isStringInvalid || this.isAttributeNameInvalid) {
        if (isNameInvalid) {
          this.$v.inputTemplateName.$touch()
          setTimeout(this.$v.inputTemplateName.$reset, 5000)
        }
        if (isStringInvalid) {
          this.$v.inputTemplateString.$touch()
          setTimeout(this.$v.inputTemplateString.$reset, 5000)
        }
      } else {
        ParserAPI.addTemplate(
          this.$store.getters.getToken,
          {
            templateName: this.inputTemplateName,
            templateString: this.inputTemplateString,
            attributesNames: this.attributes
          }
        )
        .then(response => {
          this.$notify({
            group: "notification",
            type: "ok",
            title: "Success",
            text: "Template was added to the database"
          })
          this.$emit('templateAdding')
        })
        .catch(error => {
          var message = error
          if (error.response.data.text) message = error.response.data.text
          this.$notify({
            group: "notification",
            type: "error",
            title: "Error",
            text: message
          })
        })
        this.inputTemplateName = ''
        this.inputTemplateString = ''
        this.$v.inputTemplateName.$reset()
        this.$v.inputTemplateString.$reset()
        this.isAttributeNameInvalid = true
      }
    }
  }
}
</script>