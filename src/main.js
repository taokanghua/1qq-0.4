import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000'
}))

import './styles/common.less'
import '@/assets/fonts/iconfont.css'

// 导入 iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)


//导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.axios = axios

// 请求拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization = localStorage.getItem('kktoken')
  let needLoadList = ['/forget', '/searchresult']
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
  data:{
    // session:[] //存储会话 {id, img, nickname}
  },
  sockets:{
    connect:function(){
      console.log('connection')
    },
    inviteone(data){ //监听别人发过来的邀请 并加入房间
      if(data.includes(this.$store.state.userinfo.id)){
        this.$socket.emit('joinRoom', data)
      }
    },
    receivemsg(data){ //接受短信 存储会话
      console.log(data)
      // if(data.cont.length >1) data.cont.splice(1, 1)
      let ishave = true
      // 过滤掉自己发的信息
      if(data.id == this.$store.state.userinfo.id) return
      if(this.$store.state.session.length == 0){
        this.$store.state.session.push(data)
        return
      }
      this.$store.state.session.forEach(item=>{
        if(item.id == data.id){         
          item.cont.push(data.cont[0])
          ishave = false
        }
      })

      if(ishave) this.$store.state.session.push(data)

      // 添加好友的
      if(this.$store.state.roomcontent[data.room]){
        this.$store.state.roomcontent[data.room].push(data)
      }
      // this.$store.state.havemsg = true
      // console.log(this.$store.state.session)
      
    },
    chatroom(data){ //更新聊天列表数据
      this.$store.state.roomcontent = data
      // console.log(data)
    },
    addtoo(data){ //互加好友
      // console.log(data.target,this.$store.state.userinfo.id)
      if(data.target == this.$store.state.userinfo.id){
        
        this.$store.state.userinfo.personlist.friends.push(data.my)
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
