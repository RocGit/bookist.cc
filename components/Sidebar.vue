<template>
  <aside class="sidebar">
    <section>
      <h2 class="u-colorfulText">捐助本站</h2>
      <div class="donate">
        <p>持续更新电子书需要耗费大量时间和精力，如果本站对你有些许帮助，那就捐几块鼓励一下站长吧。</p>
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
        <p style="text-align:center;margin-bottom:4px;">今日若有捐助，明日必有更新 😊</p>
      </div>
    </section>
    <section class="stats">
      <h2>统计数据</h2>
      <p>今日上传：{{ stats.todayBooks }}</p>
      <p>书籍总数：{{ stats.totalBooks }}</p>
    </section>
  </aside>
</template>

<script>
import { bookApi } from '@/api'

export default {
  data() {
    return {
      stats: {}
    }
  },
  mounted() {
    bookApi.getStats().then(data => {
      this.stats = data
    })
  }
}
</script>

<style lang="scss">
.sidebar {
  min-width: 300px;
  > section {
    padding: 10px 15px;
    margin-bottom: 25px;
    background: #fafafa;
    h2 {
      font-weight: bold;
      font-size: 17px;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      a {
        float: right;
        font-weight: normal;
        font-size: 14px;
        line-height: 1.8;
      }
    }

    .donate {
      position: relative;
      > p {
        margin: 10px 0;
        text-align: justify;
        b {
          font-weight: normal;
          color: $color-4;
        }
      }

      .qr-codes {
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        padding-bottom: 15px;
        h3 {
          margin-top: 10px;
          font-weight: bold;
        }
        img {
          max-width: 200px;
        }
        > div {
          text-align: center;
          width: 100%;
          /* @include respond(sm) {
            width: 49%;
          }
          @include respond(lg) {
            width: 100%;
          } */
        }
      }
    }
  }
}
</style>


