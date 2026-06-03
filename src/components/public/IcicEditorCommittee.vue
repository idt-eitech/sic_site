<template>
  <section class="section section--alt">
    <div class="container">
      <h2 class="section-title">ICIC Editor Committee</h2>
      <p class="section-lead">Editorial committee members supporting the ICIC conference series.</p>
      <div class="members-grid">
        <div class="member-card card" v-for="member in members" :key="member.id">
          <div class="avatar-placeholder"></div>
          <div class="member-info">
            <div class="member-name">{{ member.name }}</div>
            <div class="member-role">{{ member.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const members = [
  { id: 1, name: 'Member Name', role: 'Editor' },
  { id: 2, name: 'Member Name', role: 'Editor' },
  { id: 3, name: 'Member Name', role: 'Editor' },
  { id: 4, name: 'Member Name', role: 'Editor' }
];
</script>

<style scoped>
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}
.member-card {
  padding: 18px 16px;
  text-align: center;
}
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  background: linear-gradient(135deg, #cfd8dc, #eceff1);
}
.member-name {
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.01em;
  font-size: 1.05rem;
}
.member-role {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
