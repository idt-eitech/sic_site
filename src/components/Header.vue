<template>
  <header class="sic-header">
    <div class="logo-container">
      <img src="/SIC_logo.jpg" alt="SIC Logo" class="sic-logo" />
      <span class="org-name">SIC</span>
    </div>
    <nav class="nav-menu">
      <router-link to="/about">About</router-link>
      <router-link to="/conferences">Conferences</router-link>
      <router-link to="/journals">Journals</router-link>
      <!-- <router-link to="/membership">Membership</router-link> -->
      <router-link to="/contact">Contact</router-link>
      
      <!-- Authentication-aware navigation -->
      <div v-if="authStore.state.isAuthenticated" class="user-menu">
        <router-link 
          v-if="authStore.state.user?.role !== 'ADMIN'" 
          to="/papers" 
          class="papers-link"
        >
          My Papers
        </router-link>
        <router-link 
          v-if="authStore.state.user?.role !== 'ADMIN'" 
          to="/paper-upload" 
          class="upload-link"
        >
          Upload Paper
        </router-link>
        <router-link 
          v-if="authStore.state.user?.role === 'ADMIN'" 
          to="/admin" 
          class="admin-link"
        >
          Dashboard
        </router-link>
        <router-link to="/profile" class="profile-link">Profile</router-link>
        <span class="user-greeting">Hello, {{ authStore.state.user?.display_name }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
      <div v-else class="auth-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authStore.js'

const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.actions.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.sic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background: #1a237e; /* Deep blue from logo */
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.logo-container {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}
.sic-logo {
  height: 48px;
  margin-right: 1rem;
}
.org-name {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
}
.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav-menu a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-menu a:hover {
  color: #90caf9; /* Lighter blue for hover */
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.user-greeting {
  font-size: 0.9rem;
  color: #e3f2fd;
}

.papers-link {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #fff;
  text-decoration: none;
}

.papers-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.admin-link {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #fff;
  text-decoration: none;
}

.admin-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.profile-link {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #fff;
  text-decoration: none;
}

.profile-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.upload-link {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.upload-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.logout-btn {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}
</style> 
