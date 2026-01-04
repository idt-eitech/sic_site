<template>
  <section class="committee-section">
    <h2>ICAI Editor Committee</h2>
    <div class="members-grid">
      <div class="member-card" v-for="member in members" :key="member.id">
        <div class="avatar-placeholder"></div>
        <div class="member-info">
          <p class="member-name">{{ member.name }}</p>
          <p class="member-role">{{ member.role }}</p>
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
.committee-section {
  padding: 3rem 2rem 2rem 2rem;
  background: #f5f7fa;
  color: #1a237e;
}
.committee-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1a237e;
}
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
.member-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26,35,126,0.06);
  padding: 1.5rem 1.25rem;
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
  margin: 0 0 0.25rem 0;
  color: #1a237e;
  font-size: 1.05rem;
}
.member-role {
  margin: 0;
  color: #607d8b;
  font-size: 0.9rem;
}
</style>

