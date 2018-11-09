import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from "./router";
import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";
<<<<<<< HEAD
=======
import coreApiGraphql from './services/coreApiGraphql';



>>>>>>> 4db5566b2ce13f74cd28bee128fcf421a942173e
import './assets/scss/ga.scss'
Vue.config.productionTip = false
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);

<<<<<<< HEAD
new Vue({  
=======
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
>>>>>>> 4db5566b2ce13f74cd28bee128fcf421a942173e
  router,
  render: h => h(App),
  data: {
      person: person
  }
}).$mount('#app')
