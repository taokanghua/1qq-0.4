import Vue from 'vue'
import VueRouter from 'vue-router'

const loginIn = () => import('../views/login/loginIn')
const loginUp = () => import('@/views/login/loginUp')
const forget = () => import('@/views/login/forget/forget')

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
    }
]

const router = new VueRouter({
  routes
})

export default router
