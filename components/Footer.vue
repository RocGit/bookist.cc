<template>
  <div class="s-footer">
    <div class="container">
      <div class="note">
        <span>电子书资源声明：本站所有电子书来源于网络，若下载链接侵犯到版权方，请</span>
        <a :href="mail" target="_blank">联系站长</a>，站长核实后会第一时间移除，谢谢！
      </div>
      <div class="links">
        <a :href="mail" target="_blank">意见反馈</a>
        <span>版权所有 &copy; {{ new Date().getFullYear() }} </span>
        <a href="/">BOOKIST.CC</a>
        <a class="icp" href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备15020427号-4</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mail() {
      return 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=SSUgKCRnPignLgk4OGcqJiQ'
    }
  }
}
</script>


<style lang="scss">
.s-footer {
  font-size: 12px;
  line-height: 1.8;
  padding: 25px 0;
  border-top: 2px solid $color-border;
  margin-top: 40px;
  text-align: center;
  a:hover {
    text-decoration: underline;
  }
  .links {
    margin-top: 10px;
    a {
      margin-right: 15px;
    }
  }
  .icp {
    display: none;
    @include respond(sm) {
      display: inline;
    }
  }
}
</style>


