<template>
  <footer class="sic-footer" id="contact">
    <div class="footer-content">
      <div class="footer-left">
        <strong>SIC &mdash; The Society of International Computing</strong><br />
        Contact: info@sic.org
      </div>
      <div class="footer-right">
        &copy; 2024 SIC. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sic-footer {
  background: #1a237e;
  color: #fff;
  padding: 1.5rem 2rem 1rem 2rem;
  margin-top: auto;
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1rem;
}
.footer-left {
  margin-bottom: 0.5rem;
}
.footer-right {
  text-align: right;
}
@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-right {
    text-align: center;
  }
}
</style> 