<template>
  <section id="conferences" class="section">
    <div class="container">
      <h2 class="section-title">Conferences</h2>
      <p class="section-lead">
        SIC organizes major international meetings each year, bringing together leading researchers and practitioners in
        computing and intelligent systems.
      </p>

      <div class="conference-grid">
        <article class="conference-card card">
          <div class="conference-top">
            <h3 class="conference-title">International Conference on Intelligent Computing (ICIC) 2026</h3>
            <div class="conference-meta">July 22–26, 2026 · Toronto, Canada</div>
          </div>
          <div class="conference-body">
            <div class="conference-row"><span class="label">Theme</span><span>Advanced Intelligent Computing Methodologies and Applications</span></div>
            <div class="conference-row"><span class="label">Proceedings</span><span>Springer-Nature (LNCS/LNAI/LNBI)</span></div>
            <div class="conference-row"><span class="label">Support</span><span>Natural Science Foundation of China</span></div>
          </div>
          <div class="conference-actions">
            <a class="btn btn--primary" href="http://www.ic-icc.cn/" target="_blank" rel="noopener">Official Site</a>
          </div>
        </article>

        <article class="conference-card card">
          <div class="conference-top">
            <h3 class="conference-title">International Conference on Applied Intelligence (ICAI) 2026</h3>
            <div class="conference-meta">November 12–15, 2026 · Ningbo, Zhejiang, China</div>
          </div>
          <div class="conference-body">
            <div class="conference-row"><span class="label">Theme</span><span>Advanced Applied Intelligence Methodologies and Applications</span></div>
            <div class="conference-row"><span class="label">Proceedings</span><span>Springer Verlag (LNCS/LNAI/LNBI/CCIS)</span></div>
            <div class="conference-row"><span class="label">Support</span><span>Natural Science Foundation of China</span></div>
          </div>
          <div class="conference-actions">
            <a class="btn btn--primary" href="http://icai.org.cn/" target="_blank" rel="noopener">Official Site</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conference-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.conference-card {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
}

.conference-top {
  margin-bottom: 12px;
}

.conference-title {
  margin: 0 0 6px 0;
  font-size: 1.15rem;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.conference-meta {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.95rem;
}

.conference-body {
  display: grid;
  gap: 10px;
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.conference-row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 10px;
  color: var(--text);
}

.label {
  color: var(--muted);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.conference-actions {
  margin-top: 18px;
}

@media (max-width: 860px) {
  .conference-grid {
    grid-template-columns: 1fr;
  }

  .conference-row {
    grid-template-columns: 1fr;
  }
}
</style>
