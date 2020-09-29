import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import beforeEach from './beforeEach'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },  
  { path: '/dashboard', name: 'Dashboard', meta: { auth: true }, component: () => import('../views/Dashboard.vue') }
]

const router = new VueRouter({
  routes
})

router.beforeEach(beforeEach)

export default router
