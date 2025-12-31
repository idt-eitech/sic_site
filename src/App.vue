<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main class="app-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--sic-bg, #fff);
}
.app-content {
  flex: 1;
  width: 80vw;
  margin: 0 auto;
}
</style>
