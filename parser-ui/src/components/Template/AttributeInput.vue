<template>
  <div>
    <v-text-field
      :label="'Type the name of template attribute at position ' + (index + 1)"
      color="teal"
      v-model.trim="attributeName"
      :error-messages="nameError"
      @keyup.enter="addTemplate"
    >
    </v-text-field>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import ParserAPI from '@/components/parser-api.js'

export default {
  props: ['isButtonPressed', 'index'],
  data() {
    return {
      attributeName: ''
    }
  },
  validations: {
    attributeName: {
      required,
      maxLength: maxLength(20)
    }
  },
  computed: {
    nameError() {
      if (this.$v.attributeName.$dirty) {
        if (!this.$v.attributeName.required) return "Attribute name can\'t be empty"
        if (!this.$v.attributeName.maxLength) return "Attribute name must have no more than "
          + this.$v.attributeName.$params.maxLength.max + " characters, now "
          + this.attributeName.length + " characters"
      }
      return ""
    }
  },
  methods: {
    addTemplate() {
      this.$emit('templateAdding')
    }
  },
  watch: {
    isButtonPressed() {
      if (this.isButtonPressed) {
        if (this.$v.attributeName.$invalid) {
          this.$v.attributeName.$touch()
          setTimeout(this.$v.attributeName.$reset, 5000)
          this.$emit('attributeNameAdding', null, this.index)
        } else {
          this.$emit('attributeNameAdding', this.attributeName, this.index)
          this.$emit('attributeNameValidation', this.$v.attributeName.$invalid, this.index)
          this.$v.attributeName.$reset()
        }
      } else {
        this.$emit('attributeNameAdding', null, this.index)
      }
    }
  }
}
</script>