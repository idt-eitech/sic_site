<template>
  <section id="publications" class="section section--alt">
    <div class="container">
      <h2 class="section-title">Publications</h2>
      <p class="section-lead">
        Explore research outputs, conference proceedings, and technical papers published by SIC members and conference
        participants.
      </p>

      <div class="pub-grid">
        <a class="pub-card card" href="http://poster-openaccess.com/" target="_blank" rel="noopener">
          <div class="pub-title">Posters Collection of ICIC & ICAI</div>
          <div class="pub-meta">Open access · Proceedings and posters</div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pub-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.pub-card {
  padding: 18px 18px;
  border-left: 6px solid var(--primary);
  transition: transform 160ms ease, border-color 160ms ease;
}

.pub-card:hover {
  transform: translateY(-2px);
}

.pub-title {
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.pub-meta {
  color: var(--muted);
  font-weight: 600;
}

@media (max-width: 860px) {
  .pub-grid {
    grid-template-columns: 1fr;
  }
}
</style> 
