<template>
  <div class="p-qq-group">
    <h3>加入书大师资源分享QQ群</h3>
    <p>为了感谢各位书友对书大师的捐助，站长希望能尽绵薄之力帮助捐助者找到他们需要的资源，为此创建了一个QQ群供捐助者们交流，这个群还会分享优质中文电子书和其它精品资源。求书、下载链接失效等问题也可以在此群告诉群主，群主将第一时间给予回应。感谢所有捐助者的支持！
      <span>本站已在
        <a href="https://github.com/liamwang/bookist.cc" target="_blank">GitHub</a> 开源，欢迎 Star 和 Fork 。
      </span>
    </p>
    <p style="font-weight:bold;">强烈期望：有条件的请支持正版！有条件的请支持正版！有条件的请支持正版！</p>
    <div class="qq-group-info">
      <div>
        <span>群号：</span>
        <b>467968310</b>
      </div>
      <div>
        <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=89f583a503fd39fb1f5c7088c197d549c74cd40d08dfb66f105b494a62842771">
          <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="书大师资源分享群" title="书大师资源分享群">
        </a>
      </div>
    </div>
    <div class="u-flexWrap qr-codes">
      <div class="qrcode">
        <h3 style="color:#22A93B">微信扫一扫捐赠</h3>
        <img src="~assets/img/wepay.jpg" />
      </div>
      <div class="qrcode">
        <h3 style="color:#00A0E8">支付宝扫一扫捐赠</h3>
        <img src="~assets/img/alipay.jpg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.p-qq-group {
  min-height: calc(100vh - 240px);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  h3 {
    font-size: 22px;
    color: $color-1;
  }
  p {
    text-align: justify;
    margin: 15px 0;
    font-size: 16px;
  }

  .qq-group-info {
    margin: 20px 0;
    line-height: 2.2;
    font-size: 16px;
    b {
      color: red;
    }
  }

  .qr-codes {
    h3 {
      margin-top: 10px;
      font-weight: bold;
      font-size: 18px;
    }
    img {
      max-width: 200px;
    }
    > div {
      text-align: center;
      width: 100%;
      @include respond(sm) {
        width: 49%;
      }
    }
  }
}
</style>

