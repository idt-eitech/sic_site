import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'

// Get the base path from the environment variable (if set in GitHub Actions)
const base = import.meta.env.VITE_GITHUB_REPOSITORY ? `/${import.meta.env.VITE_GITHUB_REPOSITORY.split('/')[1]}/` : '/';
console.log(base);
const router = createRouter({
  history: createWebHistory(base),
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