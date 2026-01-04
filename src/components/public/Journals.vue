<template>
  <section id="journals" class="journals-section">
    <h2>Journals</h2>
    <p class="desc">Explore partnered journals and publishing opportunities.</p>

    <div class="journal-card">
      <h3>Computational Biomedicine (CBM)</h3>
      <p>
        CBM is a peer-reviewed, open access journal published quarterly and owned by
        Science Exploration Press. It covers a wide range of topics including
        molecular medicine, simulation, modeling techniques, imaging methods, and
        information technology.
      </p>
      <p>
        The journal’s mission is to encourage scientists to publish experimental and
        theoretical findings in a detailed open-access format. CBM invites
        submissions across article types such as Research Articles, Review Articles,
        Editorials, Case Reports, Letters to the Editor, Perspectives, and
        Commentaries.
      </p>
      <a
        href="https://www.sciexplor.com/cbm"
        class="external-link"
        target="_blank"
        rel="noopener"
      >Visit CBM Website</a>
    </div>
  </section>
</template>

<style scoped>
.journals-section {
  padding: 3rem 2rem;
  background: #fff;
  color: #1a237e;
}
.journals-section h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.desc {
  text-align: center;
  margin-bottom: 2rem;
  color: #3949ab;
}
.journal-card {
  max-width: 760px;
  margin: 0 auto;
  background: #f5f7fa;
  border: 1px solid #e3e8f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26,35,126,0.06);
  padding: 1.5rem 2rem;
}
.journal-card h3 {
  margin-top: 0;
  color: #1a237e;
}
.external-link {
  display: inline-block;
  margin-top: 1rem;
  color: #1a237e;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.2s;
}
.external-link:hover {
  color: #1976d2;
}
</style>

