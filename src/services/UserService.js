import Vue from "vue";

export default class UsersService {
    static fetchUsers(){
        return  Vue.axios.get('/users');
    }
}