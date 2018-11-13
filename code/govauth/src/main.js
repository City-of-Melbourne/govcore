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
    
    name: "User A",
    email: "usera@email.com",
    bucket: "entities",
    mobile: "0414556549",
    type: "person",
    id: "5676081261"
}
const business = {    
    id: "3357665841",
    name: "Company A",
    abn: "54654987",
    bucket: "entities",
    type: "business"
}


new Vue({
  router,
  render: h => h(App),
  data: {
      person: person,
      business: business
  }
}).$mount('#app')
