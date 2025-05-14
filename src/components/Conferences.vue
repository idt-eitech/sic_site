<template>
  <section id="conferences" class="conferences-section">
    <h2>Upcoming Conferences</h2>
    <p class="desc">
      SIC organizes two major international meetings each year, bringing together leading minds in computing technology.
    </p>
    <div class="conference-list">
      <div class="conference-card">
        <h3>SIC Global Computing Summit 2024</h3>
        <p>Date: July 15-18, 2024<br>Location: Berlin, Germany</p>
        <a href="#" class="details-link">Details</a>
      </div>
      <div class="conference-card">
        <h3>SIC International Symposium 2024</h3>
        <p>Date: December 2-5, 2024<br>Location: Tokyo, Japan</p>
        <a href="#" class="details-link">Details</a>
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