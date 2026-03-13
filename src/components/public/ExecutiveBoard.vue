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
          <template v-if="member.profileUrl">
            <a
              :href="member.profileUrl"
              class="member-name-link"
              target="_blank"
              rel="noopener"
            >
              <p class="member-name">Dr./Prof. {{ member.name }}</p>
            </a>
          </template>
          <template v-else>
            <p class="member-name">Dr./Prof. {{ member.name }}</p>
          </template>
          <h3>{{ member.role }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import shaoweiCaiImage from '../../assets/committee/Shaowei Cai.jpg'
import jairCervantesCanalesImage from '../../assets/committee/Jair Cervantes Canales.png'
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
    role: 'Beijing University of Aeronautics and Astronautics, China',
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
.member-name-link {
  text-decoration: none;
}
.member-name-link:hover .member-name {
  text-decoration: underline;
}
.member-name {
  margin: 0 0 0.1rem 0;
  color: #37474f;
  font-size: 0.95rem;
}
</style>
