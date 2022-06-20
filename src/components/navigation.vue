<template>
    <v-navigation-drawer dark app>
      <v-card dark class="pa-2 py-3" style="height: 100%">
        <v-icon
        large
        color="darken-2"
      >
        mdi-account-group
      </v-icon>
        <span class="ma-3">Список користувачів</span>
        <hr class="mt-3">
        <ul class="my-3">
          <li 
            class="py-2"
            v-for="(item, key) in items" :key="key"
          >
           <span @click="privateUserSelect(item)">{{item.login}}</span>
          </li>
        </ul>
      </v-card>
    </v-navigation-drawer>
</template>
<script>
import { mapMutations } from 'vuex';
 export default {
    name: 'Login',
    props:{
      items: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data: () => ({
    }),
    methods:{
      ...mapMutations(['setPrivateUser']),
      privateUserSelect(item){
        this.setPrivateUser(item)
      }
    }
  }
</script>
<style  scoped>
  ul {
    list-style: none;
  }
  ul li{
    cursor: pointer;
    transition: linear .3s;
  }
  ul li:hover{
    opacity: .7;
    transition: linear .3s;
  }
</style>
