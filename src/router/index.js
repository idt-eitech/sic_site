import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'

// Get the base path from the environment variable (if set in GitHub Actions)
const base = import.meta.env.BASE_URL;

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