<template>
  <section class="exec-board-section">
    <h2>Board of Executive Committee</h2>
    <div class="members-grid">
      <div class="member-card" v-for="member in members" :key="member.role">
        <div class="avatar-wrapper">
          <img
            v-if="member.image"
            :src="member.image"
            :alt="member.role"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder"></div>
        </div>
        <div class="member-info">
          <p class="member-name">{{ member.name }}</p>
          <h3>{{ member.role }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import presidentImage from '../assets/committee/president.jpg'

const members = [
  { name: 'De-Shuang Huang', role: 'President', image: presidentImage },
  { name: 'Member Name', role: 'VP of Conferences' },
  { name: 'Member Name', role: 'VP of Publications' },
  { name: 'Member Name', role: 'VP of Technical Activities' },
  { name: 'Member Name', role: 'VP of Membership' },
  { name: 'Member Name', role: 'VP of Finance' },
  { name: 'Member Name', role: 'VP of Education' },
  { name: 'Member Name', role: 'VP of Chapters' }
];
</script>

<style scoped>
.exec-board-section {
  padding: 3rem 2rem 2rem 2rem;
  background: #f5f7fa;
  color: #1a237e;
}
.exec-board-section h2 {
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
.avatar-wrapper {
  width: 96px;
  height: 96px;
  margin: 0 auto 1rem auto;
}
.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  background: linear-gradient(135deg, #cfd8dc, #eceff1);
}
.member-info h3 {
  margin: 0 0 0.25rem 0;
  color: #1a237e;
  font-size: 1.05rem;
}
.member-name {
  margin: 0 0 0.1rem 0;
  color: #37474f;
  font-size: 0.95rem;
}
</style>
