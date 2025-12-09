import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'
import About from '../components/About.vue'
import Conferences from '../components/Conferences.vue'
import Publications from '../components/Publications.vue'
import Membership from '../components/Membership.vue'
import Journals from '../components/Journals.vue'

// Use the same base path as defined in vite.config.js
const router = createRouter({
  // createWebHistory requires default routing enablement on production
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/conferences',
      name: 'conferences',
      component: Conferences
    },
    {
      path: '/journals',
      name: 'journals',
      component: Journals
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications
    },
    {
      path: '/membership',
      name: 'membership',
      component: Membership
    },
    {
      path: '/contact',
      name: 'contact',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Register
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: Register
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router 
