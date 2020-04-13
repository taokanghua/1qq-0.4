import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false, //加载图标状态
    userinfo:null, //用户信息
  },
  mutations: {
    changeStatus(state){
      state.loading = !state.loading
    }
  },
  actions: {
  },
  modules: {
  }
})
