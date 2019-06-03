import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import '@/assets/css/animate.min.css';
import '@/assets/css/public.css';

Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
