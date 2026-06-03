<template>
  <section class="section section--alt">
    <div class="container">
      <h2 class="section-title">Executive Board</h2>
      <p class="section-lead">SIC is supported by an international executive board with members across academia and industry.</p>

      <div class="members-grid">
        <article class="member-card card" v-for="member in members" :key="member.role">
          <div class="avatar-wrapper">
            <img v-if="member.image" :src="member.image" :alt="member.role" class="avatar-image" />
            <div v-else class="avatar-placeholder"></div>
          </div>
          <div class="member-info">
            <template v-if="member.profileUrl">
              <a :href="member.profileUrl" class="member-name-link" target="_blank" rel="noopener">
                <div class="member-name">Dr./Prof. {{ member.name }}</div>
              </a>
            </template>
            <template v-else>
              <div class="member-name">Dr./Prof. {{ member.name }}</div>
            </template>
            <div class="member-role">{{ member.role }}</div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import shaoweiCaiImage from '../../assets/committee/Shaowei Cai.jpg'
import jairCervantesCanalesImage from '../../assets/committee/Jair Cervantes Canales.jpg'
import valeriyaGribovaImage from '../../assets/committee/Valeriya Gribova.png'
import mMichaelGromihaImage from '../../assets/committee/M. Michael Gromiha.jpg'
import phalguniGuptaImage from '../../assets/committee/Phalguni Gupta.jpg'
import laurentHeutteImage from '../../assets/committee/Laurent Heutte.jpg'
import deShuangHuangImage from '../../assets/committee/De-Shuang Huang.jpg'
import abirHussainImage from '../../assets/committee/Abir Hussain.png'
import kangHyunJoImage from '../../assets/committee/Kang-Hyun Jo.jpg'
import prashanPremaratneImage from '../../assets/committee/Prashan Premaratne.jpg'
import chunhouZhengImage from '../../assets/committee/Chunhou Zheng.jpg'

const members = [
  {
    name: 'Shaowei Cai',
    role: 'Beihang University, China',
    image: shaoweiCaiImage
  },
  {
    name: 'Jair Cervantes Canales',
    role: 'Autonomous University of Mexico State, Mexico',
    image: jairCervantesCanalesImage
  },
  {
    name: 'Valeriya Gribova',
    role: 'Far Eastern Branch of Russian Academy of Sciences, Russia',
    image: valeriyaGribovaImage
  },
  {
    name: 'M. Michael Gromiha',
    role: 'Indian Institute of Technology Madras, India',
    image: mMichaelGromihaImage
  },
  {
    name: 'Phalguni Gupta',
    role: 'Indian Institute of Technology Kanpur, India',
    image: phalguniGuptaImage
  },
  {
    name: 'Laurent Heutte',
    role: 'University of Rouen Normandy, France',
    image: laurentHeutteImage
  },
  {
    name: 'De-Shuang Huang',
    role: 'Eastern Institute of Technology, China',
    image: deShuangHuangImage
  },
  {
    name: 'Abir Hussain',
    role: 'University of Sharjah, Sharjah, UAE',
    image: abirHussainImage
  },
  {
    name: 'Kang-Hyun Jo',
    role: 'University of Ulsan, Korea',
    image: kangHyunJoImage
  },
  {
    name: 'Prashan Premaratne',
    role: 'University of Wollongong, Australia',
    image: prashanPremaratneImage
  },
  {
    name: 'Chunhou Zheng',
    role: 'Anhui University, China',
    image: chunhouZhengImage
  }
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
  border: 1px solid var(--border);
}
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  background: linear-gradient(135deg, #cfd8dc, #eceff1);
}
.member-name-link {
  text-decoration: none;
}
.member-name {
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.member-name-link:hover .member-name {
  color: var(--primary);
}

.member-role {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.95rem;
}
</style>
