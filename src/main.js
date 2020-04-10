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

// 请求拦截器
axios.interceptors.request.use(config=>{
  let needLoadList = ['/forget']
  // console.dir(vm.$route.path)
  if(needLoadList.includes(vm.$route.path)){
    //需要加载动画的页面
    vm.$store.commit('changeStatus')
  }
  return config
})
//响应拦截器
axios.interceptors.response.use(config=>{
  vm.$store.state.loading = false
  return config
})

// import qs
import qs from 'qs'
Vue.prototype.qs = qs

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
