<template>
  <section class="section section--alt">
    <div class="container">
      <h2 class="section-title">Computational Biomedicine (CBM)</h2>
      <p class="section-lead">A peer-reviewed, gold open-access journal at the intersection of computing and biomedicine.</p>

      <div class="cbm-hero card">
        <img :src="coverImage" alt="Computational Biomedicine journal cover" class="cbm-cover" />
        <div class="cbm-hero-content">
          <img :src="logoImage" alt="Computational Biomedicine journal logo" class="cbm-logo" />
          <div class="cbm-hero-actions">
            <a class="btn btn--primary" href="https://www.sciexplor.com/cbm" target="_blank" rel="noopener">Visit Website</a>
          </div>
        </div>
      </div>

      <div class="cbm-card card">
        <p class="cbm-text">
          Computational Biomedicine (CBM) is a peer-reviewed, gold open-access journal dedicated to advancing research
          at the intersection of computational methodologies and biomedical science. The journal serves as an
          international platform for high-quality studies that leverage computational innovation to address complex
          biomedical questions.
        </p>
        <p class="cbm-text">
          CBM focuses on cutting-edge developments across areas such as bioinformatics, data science, artificial
          intelligence and machine learning, modeling and simulation, systems biology, and integrative analytics, with
          applications spanning disease mechanisms, precision medicine, and therapeutic discovery. By bridging
          experimental and computational perspectives, the journal aims to promote deeper biological insight and
          translational impact.
        </p>
        <p class="cbm-text">
          Committed to openness, rigor, and rapid dissemination, Computational Biomedicine encourages detailed
          reporting of both experimental and theoretical work in an open-access format to maximize visibility and reuse
          within the scientific community.
        </p>
        <p class="cbm-text">
          The journal welcomes a broad range of article types, including Research Articles, Review Articles, Editorials,
          Perspectives, Commentaries, Case Reports, and Letters to the Editor.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import coverImage from '../../assets/journals/cbm_cover.jpg'
import logoImage from '../../assets/journals/cbm_logo.png'
</script>

<style scoped>
.cbm-hero {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 18px;
  margin-bottom: 18px;
}
.cbm-cover {
  max-width: 260px;
  height: auto;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.cbm-logo {
  max-height: 72px;
  width: auto;
}

.cbm-hero-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cbm-hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cbm-card {
  padding: 20px;
}

.cbm-text {
  margin: 0 0 12px 0;
  color: var(--muted);
  font-weight: 600;
  line-height: 1.75;
}

.cbm-text:last-child {
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .cbm-cover {
    max-width: 200px;
  }
  .cbm-logo {
    max-height: 64px;
  }

  .cbm-hero {
    grid-template-columns: 1fr;
  }
}
</style>
