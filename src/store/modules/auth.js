import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies)

export default {
    namespaced: true,
    state: {},
    getters:{},
    mutations: {},
    actions: {
        async auth({ comit }, payload){
            const { login, password } = payload;
            let result = false;
            try{
                await Vue.axios.post('/login', {login, password})
                    .then(res => {
                        console.log(res);
                        if(res.status === 200){
                            localStorage.setItem('token', res.data.accessToken)
                            result = true;
                        }
                    })
                return result;
            }catch(e){
                console.log(e)
            }
          }
    }
};