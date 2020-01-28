<template>
  <v-row justify="center">
    <v-card class="pa-4 d-inline-block" width="100%">
      <v-card-title>
        <span class="headline">Edit template</span>
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
          @keyup.enter="updateTemplate"
        >
        </v-text-field>
        <v-text-field
          label="Type new string of template"
          color="teal"
          v-model.trim="inputTemplateString"
          :error-messages="stringError"
          @keyup.enter="updateTemplate"
          @focus="isTemplateStringModified = true"
        >
        </v-text-field>
        <div
          v-if="isTemplateStringModified"
        >
          <attribute-input
            v-for="(attribute, index) in attributes"
            :key="index"
            :index="index"
            :isButtonPressed="isButtonPressed"
            :attributesNames="attributes"
            @attributeNameAdding="addAttributeName"
            @attributeNameValidation="checkAttributeName"
            @ButtonUp="releaseButton"
            @templateAdding="updateTemplate"
          />
        </div>
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
            that must be surrounded by spaces.<br>
            <br>
            To edit the attributes names<br>
            touch the template string
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
  props: ['selectedTemplate'],
  components: {
    AttributeInput
  },
  data() {
    return {
      inputTemplateId: this.selectedTemplate.id || '',
      inputTemplateName: this.selectedTemplate.templateName || '',
      inputTemplateString: this.selectedTemplate.templateString || '',
      attributes: this.selectedTemplate.attributesNames || [],
      invalidAttributes: new Array(this.selectedTemplate.attributesNames.length),
      isButtonPressed: false,
      isAttributeNameInvalid: true,
      isTemplateStringModified: false
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
      this.isTemplateStringModified = true
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
    updateTemplate() {
      this.isButtonPressed = true
      const isNameInvalid = this.$v.inputTemplateName.$invalid
      const isStringInvalid = this.$v.inputTemplateString.$invalid
      if (this.invalidAttributes[0] == undefined)
        this.isAttributeNameInvalid = false
      if(isNameInvalid || isStringInvalid || this.isAttributeNameInvalid) {
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
            templateString: this.inputTemplateString,
            attributesNames: this.attributes
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
        this.isAttributeNameInvalid = true
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
    },
    closeCard() {
      this.$emit('editCardClosing')
    }
  }
}
</script>