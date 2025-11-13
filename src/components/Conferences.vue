<template>
  <section id="conferences" class="conferences-section">
    <h2>Upcoming Conferences</h2>
    <p class="desc">
      SIC organizes two major international meetings each year, bringing together leading minds in computing technology. Below are highlights and official links for each.
    </p>
    <div class="conference-list">
      <div class="conference-card">
        <h3>International Conference on Intelligent Computing (ICIC) 2026</h3>
        <p>Date: July 22–26, 2026<br>Location: Toronto, Canada</p>
        <p><strong>Theme:</strong> Advanced Intelligent Computing Methodologies and Applications</p>
        <p><strong>Proceedings:</strong> Springer-Nature (LNCS/LNAI/LNBI) for accepted Oral papers</p>
        <p><strong>Support:</strong> Natural Science Foundation of China</p>
        <a href="http://www.ic-icc.cn/" class="details-link" target="_blank" rel="noopener">Official Site</a>
      </div>
      <div class="conference-card">
        <h3>International Conference on Applied Intelligence (ICAI) 2025</h3>
        <p>Date: November 6–9, 2025<br>Location: Nan'ning, Guangxi, China</p>
        <p><strong>Theme:</strong> Advanced Applied Intelligence Methodologies and Applications</p>
        <p><strong>Proceedings:</strong> Springer Verlag (CCIS)</p>
        <p><strong>Support:</strong> Natural Science Foundation of China</p>        
        <a href="http://icai.org.cn/" class="details-link" target="_blank" rel="noopener">Official Site</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conferences-section {
  padding: 3rem 2rem;
  background: #fff;
  color: #1a237e;
}
.conferences-section h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.desc {
  text-align: center;
  margin-bottom: 2rem;
  color: #3949ab;
}
.conference-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.conference-card {
  background: #f5f7fa;
  border: 1px solid #e3e8f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26,35,126,0.06);
  padding: 1.5rem 2rem;
  min-width: 260px;
  max-width: 320px;
  text-align: left;
}
.conference-card h3 {
  margin-top: 0;
  color: #1a237e;
}
.details-link {
  display: inline-block;
  margin-top: 1rem;
  color: #1a237e;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.2s;
}
.details-link:hover {
  color: #1976d2;
}
</style>