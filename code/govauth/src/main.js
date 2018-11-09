import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from "./router";
import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";
import coreApiGraphql from './services/coreApiGraphql';



import './assets/scss/ga.scss'
Vue.config.productionTip = false
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);

Vue.use(Buefy)

// TODO replace with logged user
const person = {
    name: "V",
    email: "v@cfa.org",
    bucket: "entities",
    type: "person",
    id: "3786048077"
}


new Vue({
  router,
  render: h => h(App),
  data: {
      person: person
  }
}).$mount('#app')
