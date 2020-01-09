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
      <v-container fluid class="pt-10">
        <notifications
          group="notification"
          width="350"
          closeOnClick
          :max="1"
          :duration="5000"
        />
        <string-input/>
        <template-edit
          v-if="selectedTemplate"
          :selectedTemplate="selectedTemplate"
          @templateUpdate="updateTemplate"
          @editCardClosing="closeEditCard"
        />
        <template-list
          :templates="templates"
          @templatesUpdate="updateList"
          @templateSelect="selectTemplate"
        />
        <template-add @templateAdding="updateList"/>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ParserAPI from '@/components/parser-api.js'
import StringInput from '@/views/Strings/StringInput.vue'
import TemplateList from '@/views/Templates/TemplateList.vue'
import TemplateAdd from '@/views/Templates/TemplateAdd.vue'
import TemplateEdit from '@/views/Templates/TemplateEdit.vue'

export default {
  components: {
    StringInput,
    TemplateList,
    TemplateAdd,
    TemplateEdit
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
        { id: '9', templateName: 'Name9', templateString: '_att_ is 46' },
        { id: '0', templateName: 'Name0', templateString: '_att_ is 47' }
      ],
      selectedTemplate: null
    }
  },
  methods: {
    rewriteString(newString) {
      this.string = newString
    },
    updateList() {
      ParserAPI.getAllTemplates()
      .then(response => {
        this.templates = response.data
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
    selectTemplate(selectedTemplate) {
      this.selectedTemplate = selectedTemplate
    },
    updateTemplate() {
      this.updateList()
      this.closeEditCard()
    },
    closeEditCard() {
      this.selectedTemplate = null
    }
  }
}
</script>

<style>
.error {
  padding: 10px;
  margin: 30% 10% 0% 0%;

  font-size: 16px;

  color: #ffffff;
  background: #EF5350;
  border-left: 0px solid ;
  border-radius: 5px;

  opacity: 0.8;
}
.ok {
  padding: 10px;
  margin: 30% 10% 0% 0%;

  font-size: 16px;

  color: #ffffff;
  background: #26A69A;
  border-left: 0px solid ;
  border-radius: 5px;

  opacity: 0.8;
}
</style>
