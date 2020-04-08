import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/common.less'

// 导入 iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
//导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3005'
Vue.prototype.axios = axios
// import qs
import qs from 'qs'
Vue.prototype.qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
