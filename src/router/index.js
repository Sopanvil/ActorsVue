import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Films.vue'
import Actors from '../views/Actors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/films',
    name: 'Films',
    component: Films
  },
  {
    path: '/actors',
    name: 'Actors',
    component: Actors
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
