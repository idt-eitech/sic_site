import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'

// Use the same base path as defined in vite.config.js
const base = '/sic_site/';

console.log('Router base path:', base);

const router = createRouter({
  history: createWebHashHistory(base),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router 