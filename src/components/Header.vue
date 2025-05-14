<template>
  <header class="sic-header">
    <div class="logo-container">
      <img src="/SIC_logo.jpg" alt="SIC Logo" class="sic-logo" />
      <span class="org-name">SIC</span>
    </div>
    <nav class="nav-menu">
      <a href="#about">About</a>
      <a href="#conferences">Conferences</a>
      <a href="#publications">Publications</a>
      <a href="#membership">Membership</a>
      <a href="#students">Students</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
</template>

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
.nav-menu a {
  color: #fff;
  margin-left: 1.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-menu a:hover {
  color: #90caf9; /* Lighter blue for hover */
}
</style> 