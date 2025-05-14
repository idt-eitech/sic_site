<template>
  <section id="membership" class="membership-section">
    <h2>Membership</h2>
    <p class="desc">
      Join SIC to connect with a global community of computing professionals, access exclusive resources, and participate in world-class events.
    </p>
    <ul class="benefits-list">
      <li>Discounted conference registration</li>
      <li>Access to members-only publications</li>
      <li>Networking opportunities with international experts</li>
      <li>Eligibility for SIC grants and awards</li>
      <li>Student programs and mentoring</li>
    </ul>
    <a href="#" class="join-btn">Join SIC</a>
  </section>
</template>

<style scoped>
.membership-section {
  padding: 3rem 2rem;
  background: #fff;
  color: #1a237e;
}
.membership-section h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.desc {
  text-align: center;
  margin-bottom: 2rem;
  color: #3949ab;
}
.benefits-list {
  max-width: 500px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
  list-style: disc inside;
  font-size: 1.1rem;
}
.join-btn {
  display: block;
  margin: 0 auto;
  background: #1a237e;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  width: max-content;
  transition: background 0.2s, color 0.2s;
}
.join-btn:hover {
  background: #3949ab;
  color: #fff;
}
</style> 