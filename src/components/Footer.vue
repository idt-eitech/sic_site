<template>
  <footer class="sic-footer" id="contact">
    <div class="footer-content">
      <div class="footer-left">
        <strong>SIC &mdash; The Society of International Computing</strong><br />
        Contact: sic_sic_org@163.com
      </div>
      <div class="footer-right">
        沪ICP备2021000765号-5<br/>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402009930" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/src/assets/备案图标.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011402009930号</p></a>
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