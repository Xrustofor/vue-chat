import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies)

export default {
    namespaced: true,
    state: {},
    getters:{},
    mutations: {},
    actions: {
        async getUser({ comit }, payload){
            let data = null;
            try{
                await Vue.axios.post('/user', {token:payload})
                    .then(res => res.data)
                    .then(result => {
                        data = result
                    });
                    return data;
                 
            }catch(e){
                console.log(e)
            }
          }
    }
}