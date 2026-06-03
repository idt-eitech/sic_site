<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <p class="section-lead">Society of International Computing offices and contact details.</p>

      <div class="contact-grid">
        <div class="contact-card card">
          <h3 class="contact-title">Hong Kong Office (Central District)</h3>
          <div class="contact-lines">
            <p>Room 1508, 15/F, Admiralty Centre Tower I</p>
            <p>18 Harcourt Road</p>
            <p>Admiralty, Hong Kong</p>
            <p><strong>Phone:</strong> +852-2522-8000</p>
            <p><strong>Fax:</strong> +852-2522-8001</p>
            <p><strong>Email:</strong> sic_sic_org@163.com</p>
          </div>
        </div>

        <div class="contact-card card">
          <h3 class="contact-title">Hong Kong Office (Kowloon Academic Area)</h3>
          <div class="contact-lines">
            <p>Room 1106, 11/F, Block A</p>
            <p>City University of Hong Kong Kowloon Tong Campus</p>
            <p>83 Tat Chee Avenue</p>
            <p>Kowloon Tong, Kowloon</p>
            <p>Hong Kong</p>
            <p><strong>Phone:</strong> +852-3442-8000</p>
            <p><strong>Fax:</strong> +852-3442-8001</p>
            <p><strong>Email:</strong> sic_sic_org@163.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.contact-card {
  padding: 20px 20px;
  border-left: 6px solid var(--primary);
}

.contact-title {
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.contact-lines {
  color: var(--muted);
  font-weight: 600;
}

.contact-lines p {
  margin: 0 0 8px 0;
}

.contact-lines p:last-child {
  margin-bottom: 0;
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
