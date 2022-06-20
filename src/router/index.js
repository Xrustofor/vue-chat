import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue"
import Login from "@/pages/Login.vue"
import chat from "@/pages/Chat.vue";
import Registration from "@/pages/Registration.vue"
Vue.use(Router);



export default new Router({
  mode: "history",
  routes: [
    {
        path: "/",
        name: "Home",
        redirect: '/chat',
        component: Home,
        meta: {
            title: "Home",
            layout: 'Home'
        }
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "login",
            layout: 'Login'
        }
      },
      {
        path: "/registration",
        name: "Registration",
        component: Registration,
        meta: {
            title: "Registration",
            layout: 'Registration'
        }
      },
      {
        path: "/chat",
        name: "chat",
        component: chat,
        meta: {
            title: "Chat",
            layout: 'Chat'
        }
      },
  ]
})