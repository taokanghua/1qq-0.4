import Vue from 'vue'
import VueRouter from 'vue-router'

const loginIn = () => import('../views/loginIn')

Vue.use(VueRouter)

  const routes = [
    {
      path: '/', redirect: '/loginIn'
    },
    {
      path: '/loginIn', component: loginIn, name: 'loginIn'
    }
]

const router = new VueRouter({
  routes
})

export default router
