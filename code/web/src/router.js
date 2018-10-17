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
      path: "/dash",
      name: "dash",
      component: () => import("@/pages/Dash.vue") 
    },
    {
      path: "*",
      name: "404*",
      meta: { layout: "no-sidebar" },
      component: require("@/pages/404.vue").default
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "no-sidebar" },
      component: require("@/pages/Login.vue").default
    },
    {
      path: "/samples",
      name: "samples",
      meta: { layout: "no-sidebar" },
      component: require("@/pages/Samples.vue").default
    },
    {
      path: "/handsbills/login",
      name: "hbLogin",
      meta: { layout: "empty" },
      component: require("@/pages/handsbills/Login.vue").default
    },
    {
      path: "/handsbills/register",
      name: "hbRegister",
      meta: { layout: "empty" },
      component: require("@/pages/handsbills/Register.vue").default
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "no-sidebar" },
      component: require("@/pages/Register.vue").default
    }
  ]
});