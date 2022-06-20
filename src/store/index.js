import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import registration from "./modules/registration"
import auth from "./modules/auth"
import chat from "./modules/chat"

export default new Vuex.Store({
  namespaced: true,
  modules: {
    registration,
    auth,
    chat
  },
  state: {
    users: [],
    privateUser: {}
  },
  getters: {
    getUsers(state){ return state.users; },
    getPrivateUser(state){ return state.privateUser; }
  },
  mutations: {
    setUsers(state, payload){ state.users = payload; },
    setPrivateUser(state, payload){
      const {id, login, socket_id} = payload;
      state.privateUser =  { id, login, socket_id };
    },
    deletetPrivateUser(state){
      state.privateUser = {}
    }
  },
 
})
