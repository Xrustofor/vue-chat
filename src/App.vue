<template>
  <v-app>
    <navigation-vue
      :items="users"
    />
    <top-vue/>
      <v-main>
          <component :is="layout">
            <router-view />
          </component>
      </v-main>
    <bottom-vue/>
   </v-app>
</template>

<script>

import topVue from './components/top.vue'
import navigationVue from './components/navigation.vue';
import bottomVue from './components/bottom.vue';

import Home from "@/pages/Home.vue"
import Login from "@/pages/Login.vue"
import Registration from "@/pages/Registration.vue"
import Chat from "@/pages/Chat.vue"

import {mapGetters} from "vuex";

const default_layout = 'Login'

 export default {
  name: 'App',
  components:{
    Home,
    Login,
    Registration,
    topVue,
    navigationVue,
    bottomVue,
    Chat,
  },

  computed:{
    ...mapGetters({
      users: 'getUsers'
    }),
     layout() {
      return this.$route.meta.layout || default_layout
    },
  }
 }
</script>
