import Vue from 'vue'
import VueRouter from 'vue-router'

const loginIn = () => import('../views/login/loginIn')
const loginUp = () => import('@/views/login/loginUp')

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
    }
]

const router = new VueRouter({
  routes
})

export default router
