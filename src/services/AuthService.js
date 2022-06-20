import Vue from "vue";

export default class AuthService {
    static async login(login, password){
        return Vue.axios.post('/login', { login, password })
    }
    static async registration(login, password){
        return Vue.axios.post('/registration', { login, password })
    }
    static async logout(g){
        return Vue.axios.post('/logout')
    }
    
}