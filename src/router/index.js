import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import PaperUpload from '../components/PaperUpload.vue'
import PaperList from '../components/PaperList.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import UserManagement from '../components/UserManagement.vue'
import PaperManagement from '../components/PaperManagement.vue'
import About from '../components/About.vue'
import Conferences from '../components/Conferences.vue'
import Publications from '../components/Publications.vue'
import Membership from '../components/Membership.vue'
import Journals from '../components/Journals.vue'
import UserProfile from '../components/UserProfile.vue'

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
      component: Login
    },
    {
      path: '/paper-upload',
      name: 'paper-upload',
      component: PaperUpload
    },
    {
      path: '/papers',
      name: 'papers',
      component: PaperList
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: UserManagement
    },
    {
      path: '/admin/papers',
      name: 'admin-papers',
      component: PaperManagement
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
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
