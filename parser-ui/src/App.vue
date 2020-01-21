<template>
  <v-app id="app">
    <notifications
      group="notification"
      width="350"
      closeOnClick
      :max="1"
      :duration="5000"
    />

    <v-app-bar app color="teal" dark class="px-3">
      <v-toolbar-title class="display-1 pl-4">
        Parser
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-row
          v-if="this.$store.getters.isAuthenticated"
          align="center"
          justify="end"
        >
          <span
            class="headline font-weight-regular mr-1"
          >
            {{ this.$store.getters.getUsername }}
          </span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                @click="logout"
                v-on="on"
              >
                <v-icon>exit_to_app</v-icon>
              </v-btn>
            </template>
            <span>
              Exit
            </span>
            </v-tooltip>
        </v-row>
        
        <v-dialog
          v-else
          width="50%"
          @click:outside="isNotRegistration = true"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              class="headline font-weight-regular text-capitalize"
              v-on="on"
            >
              Sign in
            </v-btn>
          </template>
          <login
            v-if="isNotRegistration"
            @toRegistration="isNotRegistration = false"
          />
          <registration
            v-else
            @toLogin="isNotRegistration = true"
          />
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar> 
    
    <v-content>
      <v-container fluid class="py-10">
        <v-row justify="center">
          <v-col cols=10>
            <div v-if="this.$store.getters.isAuthenticated">
              <template-add
                v-if="this.$store.getters.isAdmin"
                @templateAdding="updateList"
                class="mt-4"
              />
              <string-input
                v-else
                :selectedTemplate="selectedTemplate"
                class="mt-4"
              />
              <template-edit
                v-if="selectedTemplate && this.$store.getters.isAdmin"
                :selectedTemplate="selectedTemplate"
                @templateUpdate="updateTemplate"
                @editCardClosing="closeEditCard"
                class="mt-8"
              />
              <template-list
                :templates="templates"
                @templatesUpdate="updateList"
                @templateSelect="selectTemplate"
                class="my-8"
              />
            </div>
            <home
              v-else
              class="mt-4"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Home from '@/components/Home.vue'
import Login from '@/components/Auth/Login.vue'
import Registration from '@/components/Auth/Registration.vue'
import StringInput from '@/components/String/StringInput.vue'
import TemplateAdd from '@/components/Template/TemplateAdding.vue'
import TemplateEdit from '@/components/Template/TemplateEdit.vue'
import TemplateList from '@/components/Template/TemplateList.vue'
import ParserAPI from '@/components/parser-api.js'

export default {
  components: {
    Home,
    Login,
    Registration,
    StringInput,
    TemplateAdd,
    TemplateEdit,
    TemplateList
  },
  data() {
    return {
      isNotRegistration: true,
      templates: [],
      selectedTemplate: null
    }
  },
  methods: {
    updateList() {
      ParserAPI.getAllTemplates(this.$store.getters.getToken)
      .then(response => {
        this.templates = response.data
      })
      .catch(error => {
        this.$notify({
          group: "notification",
          type: "error",
          title: "Error",
          text: error
        })
        this.$store.dispatch('logout')
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
    },
    logout() {
      this.$store.dispatch('logout')
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
