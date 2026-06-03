<template>
  <header
    class="site-header"
    @mouseleave="closeActiveMenu"
  >
    <div class="header-top">
      <div class="container header-top-inner">
        <router-link to="/" class="brand" aria-label="SIC home">
          <img src="/SIC_logo.jpg" alt="SIC Logo" class="brand-logo" />
          <div class="brand-text">
            <div class="brand-title">
              Society of International Computing
              <span class="brand-short">SIC</span>
            </div>
          </div>
        </router-link>

        <div class="header-actions">
          <div v-if="authStore.state.isAuthenticated" class="nav-item user-menu-item">
            <span
              class="nav-root user-greeting"
              @focus="openMenu('user')"
              tabindex="0"
              @mouseenter="openMenu('user')"
            >
              {{ authStore.state.user?.display_name }}
            </span>
            <button @click="handleLogout" class="logout-btn">Logout</button>
            <div
              class="nav-panel nav-panel--right"
              :class="{ 'is-open': activeTopMenu === 'user' }"
              @mouseenter="openMenu('user')"
            >
              <div class="nav-panel-inner">
                <div v-if="authStore.state.user?.role !== 'ADMIN'" class="panel-group">
                  <div class="panel-group-title">Papers</div>
                  <router-link class="panel-item" to="/papers">My Papers</router-link>
                  <router-link class="panel-item" to="/paper-upload">Upload Paper</router-link>
                </div>
                <div v-if="authStore.state.user?.role === 'ADMIN'" class="panel-group">
                  <div class="panel-group-title">Admin</div>
                  <router-link class="panel-item" to="/admin">Dashboard</router-link>
                  <router-link class="panel-item" to="/admin/users">User Management</router-link>
                  <router-link class="panel-item" to="/admin/papers">Paper Management</router-link>
                </div>
                <div class="panel-group">
                  <div class="panel-group-title">Account</div>
                  <router-link class="panel-item" to="/profile">Profile</router-link>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="auth-links">
            <router-link class="auth-link" to="/login">Request for Preprint ID</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="header-nav">
      <div class="container header-nav-inner">
        <nav class="nav-menu">
          <router-link to="/">Home Page</router-link>

          <div class="nav-item about-item" @mouseenter="openMenu('about')">
            <router-link to="/about" class="nav-trigger" @focus="openMenu('about')">About Us</router-link>
            <div class="nav-panel" :class="{ 'is-open': activeTopMenu === 'about' }" @mouseenter="openMenu('about')">
              <div class="nav-panel-inner">
                <div class="panel-group">
                  <div class="panel-group-title">About Us</div>
                  <router-link class="panel-item" to="/about">Overview</router-link>
                  <router-link class="panel-item" to="/executive-board">Executive Board</router-link>
                </div>
              </div>
            </div>
          </div>

          <router-link to="/fellows">Fellows</router-link>

          <div class="nav-item conferences-item" @mouseenter="openMenu('conferences')">
            <router-link to="/conferences" class="nav-trigger" @focus="openMenu('conferences')">Conferences</router-link>
            <div
              class="nav-panel"
              :class="{ 'is-open': activeTopMenu === 'conferences' }"
              @mouseenter="openMenu('conferences')"
            >
              <div class="nav-panel-inner">
                <div class="panel-group">
                  <div class="panel-group-title">Conferences</div>
                  <router-link class="panel-item" to="/conferences">Overview</router-link>
                </div>

                <div class="panel-group">
                  <div class="panel-group-title">ICIC</div>
                  <a class="panel-item" href="http://www.ic-icc.cn/" target="_blank" rel="noopener">Official Website</a>
                  <router-link class="panel-item" to="/conferences/icic/editor-committee">Editor Committee</router-link>
                </div>

                <div class="panel-group">
                  <div class="panel-group-title">ICAI</div>
                  <a class="panel-item" href="http://icai.org.cn/" target="_blank" rel="noopener">Official Website</a>
                  <router-link class="panel-item" to="/conferences/icai/editor-committee">Editor Committee</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-item journals-item" @mouseenter="openMenu('journals')">
            <span class="nav-root nav-trigger" @focus="openMenu('journals')" tabindex="0">Journals</span>
            <div
              class="nav-panel"
              :class="{ 'is-open': activeTopMenu === 'journals' }"
              @mouseenter="openMenu('journals')"
            >
              <div class="nav-panel-inner">
                <div class="panel-group">
                  <div class="panel-group-title">Journals</div>
                  <router-link class="panel-item" to="/journals">Overview</router-link>
                </div>

                <div class="panel-group">
                  <div class="panel-group-title">CBM</div>
                  <router-link class="panel-item" to="/journals/cbm">Computational Biomedicine</router-link>
                  <a class="panel-item" href="https://www.sciexplor.com/cbm" target="_blank" rel="noopener">Visit Website</a>
                </div>
              </div>
            </div>
          </div>

          <router-link to="/contact">Contact</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authStore.js'

const router = useRouter()

const activeTopMenu = ref(null)

const openMenu = (menuId) => {
  activeTopMenu.value = menuId
}

const closeActiveMenu = () => {
  activeTopMenu.value = null
}

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
.site-header {
  z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header-top {
  border-bottom: 1px solid rgba(226, 232, 240, 0.75);
}

.header-top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 34px 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-nav {
  background: rgba(255, 255, 255, 0.72);
}

.header-nav-inner {
  padding: 8px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  min-width: 280px;
}

.brand-logo {
  width: 76px;
  height: 76px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid var(--border);
  background: #fff;
}

.brand-title {
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.12;
  font-size: 1.35rem;
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.brand-short {
  color: var(--muted);
  font-weight: 900;
  letter-spacing: 0.12em;
  font-size: 0.95rem;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.03);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-item {
  position: relative;
}

.nav-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-trigger::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid rgba(15, 23, 42, 0.55);
  transform: translateY(1px);
}

.nav-item:hover .nav-trigger::after {
  border-top-color: rgba(11, 61, 145, 0.9);
}

.nav-menu > a,
.nav-menu > .nav-item > a {
  color: var(--text);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 10px;
  border-radius: 999px;
  transition: background 160ms ease, color 160ms ease;
}

.nav-menu > a:hover,
.nav-menu > .nav-item > a:hover {
  background: rgba(11, 61, 145, 0.08);
  color: var(--primary);
}

:deep(.router-link-exact-active),
:deep(.router-link-active) {
  color: var(--primary);
}

.nav-root {
  color: var(--text);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 999px;
  transition: background 160ms ease, color 160ms ease;
}

.nav-root:hover,
.nav-root:focus {
  background: rgba(11, 61, 145, 0.08);
  color: var(--primary);
  outline: none;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-greeting {
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  transition: background 160ms ease, border-color 160ms ease;
}

.logout-btn:hover {
  background: rgba(15, 23, 42, 0.04);
  border-color: #cbd5e1;
}

.auth-links {
  display: flex;
  align-items: center;
}

.auth-link {
  background: var(--primary);
  color: var(--primary-ink) !important;
  padding: 12px 16px !important;
  font-weight: 800;
}

.auth-link:hover {
  background: var(--link-hover) !important;
  color: var(--primary-ink) !important;
}

.nav-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 320px;
  max-width: 360px;
  background: #ffffff;
  color: var(--text);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.16);
  z-index: 10;
  display: none;
}

.nav-panel::before {
  content: '';
  position: absolute;
  top: -7px;
  left: 26px;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-left: 1px solid var(--border);
  border-top: 1px solid var(--border);
  transform: rotate(45deg);
}

.nav-panel--right {
  left: auto;
  right: 0;
}

.nav-panel--right::before {
  left: auto;
  right: 26px;
}

.nav-panel.is-open {
  display: block;
}

.nav-panel-inner {
  display: grid;
  gap: 10px;
}

.panel-group {
  padding: 10px;
  border-radius: 12px;
}

.panel-group + .panel-group {
  border-top: 1px solid var(--border);
  padding-top: 14px;
}

.panel-group-title {
  font-weight: 800;
  color: rgba(15, 23, 42, 0.75);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;
  margin-bottom: 8px;
}

.nav-panel .panel-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 10px;
  border-radius: 10px;
  font-weight: 700;
  color: var(--text);
  transition: background 160ms ease, color 160ms ease;
}

.nav-panel .panel-item:hover {
  background: rgba(11, 61, 145, 0.08);
  color: var(--primary);
}

.nav-panel .panel-item:active {
  transform: translateY(1px);
}

@media (max-width: 860px) {
  .brand {
    min-width: 0;
  }

  .header-top-inner {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .nav-menu {
    justify-content: center;
  }
}
</style> 
