<template>
  <section id="membership" class="section">
    <div class="container">
      <h2 class="section-title">Membership</h2>
      <p class="section-lead">
        Join SIC to connect with a global community of computing professionals, access exclusive resources, and
        participate in world-class events.
      </p>
      <ul class="benefits-list">
        <li>Discounted conference registration</li>
        <li>Access to members-only publications</li>
        <li>Networking opportunities with international experts</li>
        <li>Eligibility for SIC grants and awards</li>
      </ul>
      <router-link to="/register" class="btn btn--primary join-btn">Join SIC</router-link>
    </div>
  </section>
</template>

<style scoped>
.benefits-list {
  margin: 22px 0 24px 0;
  padding: 0 0 0 18px;
  color: var(--muted);
  font-weight: 600;
  line-height: 1.75;
}

.join-btn {
  width: fit-content;
}
</style> 
