import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import router from './router'

Vue.use(VueCookies);
Vue.use(VueAxios, axios);

const baseURL = process.env.VUE_APP_URL;

axios.defaults.baseURL = process.env.VUE_APP_URL;

axios.create({
    withCredentials: true,
})


axios.interceptors.request.use( config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const accessToken = localStorage.getItem('token')
        if(!accessToken && router.history.current.login !== 'login'){
            router.push("/login");
        }
        return config;
    }
), function (error) {
    return Promise.reject(error) ;
}