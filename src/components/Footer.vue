<template>
  <footer class="sic-footer" id="contact">
    <div class="container footer-content">
      <div class="footer-left">
        <div class="footer-brand">Society of International Computing (SIC)</div>
        <div class="footer-meta">Contact: sic_sic_org@163.com</div>
      </div>
      <div class="footer-right">
        <div class="footer-meta">沪ICP备2021000765号-5</div>
        <a
          class="beian-link"
          target="_blank"
          rel="noopener"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402009930"
        >
          <img class="beian-icon" src="/src/assets/备案图标.png" alt="" />
          <span class="beian-text">沪公网安备31011402021639号</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sic-footer {
  background: #0b1f46;
  color: rgba(255, 255, 255, 0.92);
  padding: 34px 0;
  margin-top: auto;
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.footer-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
}

.footer-brand {
  font-weight: 800;
  letter-spacing: -0.01em;
}

.footer-meta {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
}

.beian-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.78);
}

.beian-link:hover {
  color: rgba(255, 255, 255, 0.92);
}

.beian-icon {
  width: 18px;
  height: 18px;
}

.beian-text {
  font-size: 0.95rem;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-right {
    text-align: center;
    align-items: center;
  }
}
</style> 
