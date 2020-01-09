import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(Notifications);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
