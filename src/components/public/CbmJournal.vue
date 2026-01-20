<template>
  <section class="cbm-section">
    <h2>Computational Biomedicine (CBM)</h2>
    <div class="cbm-hero">
      <img
        :src="coverImage"
        alt="Computational Biomedicine journal cover"
        class="cbm-cover"
      />
      <img
        :src="logoImage"
        alt="Computational Biomedicine journal logo"
        class="cbm-logo"
      />
    </div>
    <div class="cbm-card">
      <p>
        Computational Biomedicine (CBM) is a peer-reviewed, gold open-access
        journal dedicated to advancing research at the intersection of
        computational methodologies and biomedical science. The journal serves
        as an international platform for high-quality studies that leverage
        computational innovation to address complex biomedical questions.
      </p>
      <p>
        CBM focuses on cutting-edge developments across areas such as
        bioinformatics, data science, artificial intelligence and machine
        learning, modeling and simulation, systems biology, and integrative
        analytics, with applications spanning disease mechanisms, precision
        medicine, and therapeutic discovery. By bridging experimental and
        computational perspectives, the journal aims to promote deeper
        biological insight and translational impact.
      </p>
      <p>
        Committed to openness, rigor, and rapid dissemination, Computational
        Biomedicine encourages detailed reporting of both experimental and
        theoretical work in an open-access format to maximize visibility and
        reuse within the scientific community.
      </p>
      <p>
        The journal welcomes a broad range of article types, including Research
        Articles, Review Articles, Editorials, Perspectives, Commentaries, Case
        Reports, and Letters to the Editor.
      </p>
      <p class="cbm-link">
        For more information, please visit:
        <a
          href="https://www.sciexplor.com/cbm"
          target="_blank"
          rel="noopener"
        >
          https://www.sciexplor.com/cbm
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
import coverImage from '../../assets/journals/cbm_cover.jpg'
import logoImage from '../../assets/journals/cbm_logo.png'
</script>

<style scoped>
.cbm-section {
  padding: 3rem 2rem 2rem 2rem;
  background: #f5f7fa;
  color: #1a237e;
}
.cbm-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1a237e;
}
.cbm-hero {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  margin-bottom: 2rem;
}
.cbm-cover {
  max-width: 260px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26, 35, 126, 0.12);
}
.cbm-logo {
  max-height: 80px;
  width: auto;
}
.cbm-card {
  max-width: 760px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e3e8f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26, 35, 126, 0.06);
  padding: 2rem;
  font-size: 1.05rem;
  line-height: 1.6;
  text-align: center;
}
.cbm-card p {
  margin-bottom: 1rem;
}
.cbm-card p:last-child {
  margin-bottom: 0;
}
.cbm-link a {
  color: #1a237e;
  text-decoration: underline;
}
.cbm-link a:hover {
  color: #1976d2;
}
@media (max-width: 600px) {
  .cbm-cover {
    max-width: 200px;
  }
  .cbm-logo {
    max-height: 64px;
  }
}
</style>
