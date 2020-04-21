import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false, //加载图标状态
    userinfo:null, //用户信息
    session:[], //会话
    roomcontent:null, //所有房间的聊天记录
    havemsg: false,
    showTag: true // 首页系统通告
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
