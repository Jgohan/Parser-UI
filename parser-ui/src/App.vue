<template>
  <v-app id="app">
    <v-app-bar app color="teal" dark class="pl-4">
      <v-toolbar-title class="display-1 pl-2">
        Parser
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span
        class="title font-weight-regular"
      >
        Милостивый Сэр
      </span>
      <v-btn icon large>
        <v-icon v-if="true">exit_to_app</v-icon>
      </v-btn>
    </v-app-bar> 
    
    <v-content>
      <v-container fluid>
        <string-input :string="string" @stringUpdate="rewriteString"/>
        <template-edit :selectedTemplate="selectedTemplate" v-if="selectedTemplate"/>
        <template-list :templates="templates" @templatesUpdate="updateList" @templateSelect="selectTemplate"/>
        <template-add/>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import StringInput from '@/views/Strings/StringInput.vue'
import TemplateList from '@/views/Templates/TemplateList.vue'
import TemplateAdd from '@/views/Templates/TemplateAdd.vue'
import TemplateEdit from '@/views/Templates/TemplateEdit.vue'
import test from '@/views/Strings/test.vue'

export default {
  components: {
    StringInput,
    TemplateList,
    TemplateAdd,
    TemplateEdit,
    test
  },
  data() {
    return {
      templates: [
        { id: '1', templateName: 'Name1', templateString: '_att_ is _att_' },
        { id: '2', templateName: 'Name2', templateString: '_att_ exists' },
        { id: '3', templateName: 'Name3', templateString: '_att_ is 1' },
        { id: '4', templateName: 'Name4', templateString: '_att_ is 2' },
        { id: '5', templateName: 'Name5', templateString: '_att_ is 3' },
        { id: '6', templateName: 'Name6', templateString: '_att_ is 4' },
        { id: '7', templateName: 'Name7', templateString: '_att_ is 5' },
        { id: '8', templateName: 'Name8', templateString: '_att_ is 6' },
        { id: '9', templateName: 'Name9', templateString: '_att_ is 47' },
        { id: '0', templateName: 'Name0', templateString: '_att_ is 47' }
      ],
      string: '',
      selectedTemplate: null
    }
  },
  methods: {
    rewriteString(newString) {
      this.string = newString
    },
    updateList(newTemplates) {
      this.templates = newTemplates
    },
    selectTemplate(selectedTemplate) {
      this.selectedTemplate = selectedTemplate
    }
  }
}
</script>

<style>
/* #app{
  font-family: sans-serif;
} */
</style>
