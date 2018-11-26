import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const base =
  process.env.NODE_ENV === "production"
    ? "/ga/"
    : "/";

export default new Router({
  mode: "history",
  base,

  routes: [
    {
      path: "/",      
      meta: { layout: "no-sidebar" },
      component: require("@/pages/404.vue").default
    },
    {
      path: "*",
      name: "404*",
      meta: { layout: "no-sidebar" },
      component: require("@/pages/404.vue").default
    },
    // Explore    
    {
      path: "/explore",
      name: "explore",
      component: () => import("@/pages/Explore.vue")
    },
    // Explore    
    {
      path: "/test",
      name: "test",
      component: () => import("@/pages/Test.vue")
    }
  ]
});