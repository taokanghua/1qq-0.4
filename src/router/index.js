import Vue from 'vue'
import VueRouter from 'vue-router'

const loginIn = () => import('../views/login/loginIn')
const loginUp = () => import('@/views/login/loginUp')
const forget = () => import('@/views/login/forget/forget')

const contact = () => import('@/views/home/contacts')
const message = () => import('@/views/home/message')
const discover = () => import('@/views/home/discover')

const charpage = () => import('@/components/chat/chatPage')
const addfriend = () => import('@/views/home/contact-com/addfriend')
const setmyself = () => import('@/views/home/contact-com/setmyself')

Vue.use(VueRouter)

  const routes = [
    {
      path: '/', redirect: '/loginIn'
    },
    {
      path: '/loginIn', component: loginIn, name: 'loginIn'
    },
    {
      path: '/loginUp', component: loginUp, name: 'loginUp'
    },
    {
      path: '/forget', component: forget, name: 'forget'
    },
    {
      path:'/contacts', component: contact, name: 'contact'
    },
    {
      path:'/message', component: message, name: 'message'
    },
    {
      path: '/discover', component: discover, name: 'discover'
    },
    {
      path: '/charpage/:id', component: charpage, name: 'charpage'
    },
    {
      path: '/addfriend', component: addfriend, name:'addfriend'
    },
    {
      path: '/updateinfo', component: setmyself, name:'setmyself'
    }
]

const router = new VueRouter({
  routes,
  linkActiveClass: "now"
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let allowList = ['/forget', '/loginIn', '/loginUp']
  if(allowList.includes(to.path)) return next()
  let token = localStorage.getItem('kktoken')
  if(!token) return next('/loginIn')
  next()
})

export default router
