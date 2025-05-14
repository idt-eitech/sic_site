<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Conferences from './components/Conferences.vue'
import Publications from './components/Publications.vue'
import Membership from './components/Membership.vue'
import Students from './components/Students.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <Hero />
    <About />
    <Conferences />
    <Publications />
    <Membership />
    <Students />
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
</style>
