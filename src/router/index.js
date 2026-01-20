import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/user/Register.vue'
import Login from '../components/user/Login.vue'
import PaperUpload from '../components/user/PaperUpload.vue'
import PaperList from '../components/user/PaperList.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'
import UserManagement from '../components/admin/UserManagement.vue'
import PaperManagement from '../components/admin/PaperManagement.vue'
import About from '../components/public/About.vue'
import Conferences from '../components/public/Conferences.vue'
import Publications from '../components/public/Publications.vue'
import Membership from '../components/public/Membership.vue'
import Journals from '../components/public/Journals.vue'
import CbmJournal from '../components/public/CbmJournal.vue'
import UserProfile from '../components/user/UserProfile.vue'
import Contact from '../components/public/Contact.vue'
import ExecutiveBoard from '../components/public/ExecutiveBoard.vue'
import IcicEditorCommittee from '../components/public/IcicEditorCommittee.vue'
import IcaiEditorCommittee from '../components/public/IcaiEditorCommittee.vue'

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
      path: '/conferences/icic/editor-committee',
      name: 'conferences-icic-editor-committee',
      component: IcicEditorCommittee
    },
    {
      path: '/conferences/icai/editor-committee',
      name: 'conferences-icai-editor-committee',
      component: IcaiEditorCommittee
    },
    {
      path: '/journals',
      name: 'journals',
      component: Journals
    },
    {
      path: '/journals/cbm',
      name: 'journals-cbm',
      component: CbmJournal
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
      path: '/executive-board',
      name: 'executive-board',
      component: ExecutiveBoard
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
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
