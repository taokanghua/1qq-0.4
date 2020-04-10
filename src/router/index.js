import Vue from 'vue'
import VueRouter from 'vue-router'

const loginIn = () => import('../views/login/loginIn')
const loginUp = () => import('@/views/login/loginUp')
const forget = () => import('@/views/login/forget/forget')

const contact = () => import('@/views/home/contacts')

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
    }
]

const router = new VueRouter({
  routes
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
