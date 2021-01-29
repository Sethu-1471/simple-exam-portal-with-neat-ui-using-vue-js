import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueToastify from "vue-toastify";

Vue.use(VueToastify);
Vue.config.productionTip = true

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
