import Vue from 'vue';
import VueCookies from 'vue-cookies';

import AuthService from "@/services/AuthService";

Vue.use(VueCookies)

export default {
    namespaced: true,
    state: {},
    getters:{},
    mutations: {},
    actions: {
        async sendRegistration({ comit }, payload){
            const { login, password } = payload;
            let access = false;
            try{
              const responce = await AuthService.registration(login, password);
              if(responce.status === 200){
                localStorage.setItem('token', responce.data.accessToken)
                return true;
              }
            }catch(e){
              console.log(e)
            }
          }
    }
}