import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import store from './store'
import router from './router';
import './axios';
Vue.config.productionTip = false

const baseURL = process.env.VUE_APP_URL;

router.beforeEach((to, from, next) => {
  const documentTitle = to.meta.title;
  document.title = documentTitle;
  next();
});

new Vue({
  methods: {
      clickButton: function (data) {
          this.$socket.emit('emit_method', data)
      }
  },
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
