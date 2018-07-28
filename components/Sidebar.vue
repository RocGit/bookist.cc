<template>
  <aside class="sidebar">
    <box padding="10px 12px">
      <h2>
        热门标签
        <router-link to="/tags">查看所有</router-link>
      </h2>
      <div class="tags u-flexWrap">
        <router-link v-for="tag in tags" :key="tag.id" class="u-tag" :to="`/tag/${tag.name}`">{{tag.name}}</router-link>
      </div>
    </box>
    <box padding="10px 12px">
      <h2 class="u-colorfulText">
        捐赠本站
      </h2>
      <div class="donate">
        <p>
          如果您觉得本站的资源对您有些许帮助 😊 那就小小奖励下站长吧 🎁 您的捐赠会让站长更有动力持续更新资源 💪
        </p>
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
        <p>
          <span>注：扫码捐赠时请在</span>
          <b>备注</b>
          <span>中填写您的</span>
          <b>联系邮箱或QQ</b>
          <span>，以便站长记录并表达感谢。当然，您也可以匿名捐赠。</span>
        </p>
      </div>
    </box>
    <box padding="10px 12px" class="stats">
      <h2>统计数据</h2>
      <p>书籍总数：{{stats.totalBooks}}</p>
      <p>今日上传：{{stats.todayBooks}}</p>
    </box>
  </aside>
</template>

<script>
import Box from './Box'
import { dataApi, tagApi } from '../api'

export default {
  components: { Box },
  data() {
    return {
      tags: [],
      stats: {},
    }
  },
  mounted() {
    tagApi.getTrending().then(data => {
      this.tags = data
    })
    dataApi.getStats().then(data => {
      this.stats = data
    })
  }
}
</script>

<style lang="scss">
.sidebar {
  .box {
    margin-bottom: 15px;
    h2 {
      font-size: 16px;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid $color-border;
      a {
        float: right;
        font-weight: normal;
        font-size: 14px;
        line-height: 1.8;
      }
    }
    .tags {
      margin-right: -5px;
      height: 135px;
      overflow: hidden;
      align-items: flex-start;
    }

    .donate {
      position: relative;
      > p {
        padding-bottom: 10px;
        margin-top: 10px;
        text-align: justify;
        b {
          font-weight: normal;
          color: $color-4;
        }
      }

      .qr-codes {
        border-bottom: 1px solid $color-border;
        border-top: 1px solid $color-border;
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
          @include respond(sm) {
            width: 49%;
          }
          @include respond(lg) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


