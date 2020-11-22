import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { message, Avatar, Button, Dropdown, Menu, Icon, Modal, FormModel, Input, Checkbox } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true;

Vue.use(FormModel);
Vue.use(Avatar)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Modal)
Vue.use(Input)
Vue.use(Checkbox)

Vue.prototype.$message = message;
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
