<template>
  <section class="hero">
    <div class="hero-media" aria-hidden="true"></div>
    <div class="container hero-content">
      <div class="hero-kicker">International Society</div>
      <h1 class="hero-title">Society of International Computing (SIC)</h1>
      <p class="hero-lead">
        Advancing global computing research and collaboration through conferences, publications, and an international
        community of researchers and practitioners.
      </p>
      <div class="hero-actions">
        <a href="#conferences" class="btn btn--primary">Upcoming Conferences</a>
        <a href="#about" class="btn btn--ghost">Learn More</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 520px;
  display: flex;
  align-items: center;
  background: #050f1f;
  color: #ffffff;
}

.hero-media {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 420px at 12% 18%, rgba(13, 148, 255, 0.45) 0%, rgba(13, 148, 255, 0) 60%),
    radial-gradient(760px 380px at 86% 36%, rgba(79, 70, 229, 0.38) 0%, rgba(79, 70, 229, 0) 65%),
    linear-gradient(120deg, rgba(11, 61, 145, 0.8), rgba(5, 15, 31, 0.9)),
    url('/SIC_logo.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(1.05);
  transform: scale(1.05);
}

.hero-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(5, 15, 31, 0.92) 0%, rgba(5, 15, 31, 0.72) 52%, rgba(5, 15, 31, 0.45) 100%);
}

.hero-content {
  position: relative;
  padding: 86px 0;
  max-width: 860px;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  margin-bottom: 18px;
}

.hero-title {
  margin: 0 0 14px 0;
  font-size: 52px;
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.hero-lead {
  margin: 0 0 26px 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.15rem;
  max-width: 70ch;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero :deep(.btn--ghost) {
  color: rgba(255, 255, 255, 0.92);
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.06);
}

.hero :deep(.btn--ghost:hover) {
  color: rgba(255, 255, 255, 0.98);
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 720px) {
  .hero {
    min-height: 460px;
  }

  .hero-content {
    padding: 70px 0;
  }

  .hero-title {
    font-size: 38px;
  }
}
</style> 
