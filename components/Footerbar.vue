<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          电子书资源声明：本站所有电子书来源于网络，若下载链接侵犯到版权方，请
          <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=SSUgKCRnPignLgk4OGcqJiQ" target="_blank">联系站长</a>，站长核实后会第一时间移除，谢谢！
        </p>
        <p class="links">
          <a href="https://github.com/liamwang/bookist.cc/issues" target="_blank">意见反馈</a>
          <span>版权所有 &copy; {{ new Date().getFullYear() }} <a href="/">BOOKIST.CC</a></span>
          <a class="icp" href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备15020427号-4</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>


<style lang="scss">
.footer {
  font-size: 12px;
  margin-top: 40px;
  padding: 2rem 1.5rem;
  .links > a,
  .links > span {
    display: inline-block;
    padding: 0 5px;
  }
  .icp {
    display: none;
    @include respond(sm) {
      display: inline;
    }
  }
}
</style>


