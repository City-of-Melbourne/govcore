import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from "./router";
import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";
import VueFormJsonSchema from 'vue-form-json-schema';



import './assets/scss/govbox.scss'
Vue.config.productionTip = false
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.component('vue-form-json-schema', VueFormJsonSchema);
Vue.use(Buefy)


new Vue({
  router,
  render: h => h(App)
 
}).$mount('#app')
