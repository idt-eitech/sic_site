<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-shell">
    <Header />
    <main class="app-main">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--page-bg);
}
.app-main {
  flex: 1;
  background: var(--page-bg);
}
</style>
