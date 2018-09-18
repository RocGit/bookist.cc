<template>
  <div class="p-book">
    <h1>{{book.title}}</h1>
    <h2 v-if="book.subtitle">{{book.subtitle}}</h2>
    <section class="section-info">
      <img :alt="book.title + ' 封面'" class="cover" :src="$imgUrl(book.coverId,'w180')" />
      <div class="meta">
        <dl>
          <dt>作者</dt>：
          <dd>{{book.author}}</dd>
        </dl>
        <dl>
          <dt>出版社</dt>：
          <dd>{{book.publisher||'-'}}</dd>
        </dl>
        <dl>
          <dt>出版年</dt>：
          <dd>{{book.publishDate | month}}</dd>
        </dl>
        <dl>
          <dt>ISBN</dt>：
          <dd>{{book.isbn}}</dd>
        </dl>
        <dl>
          <dt>版本</dt>：
          <dd>第 {{book.edition}} 版</dd>
        </dl>
        <dl>
          <dt>页数</dt>：
          <dd>{{book.pages}} {{book.pages?'页':'-'}}</dd>
        </dl>
        <div class="tags">
          <router-link class="u-tag" v-for="tag in book.tags" :key="tag.id" :to="{path:'/',query:{tag:tag.name}}">{{tag.name}}</router-link>
        </div>
      </div>
      <div class="share">
        <h5>分享</h5>
        <a @click="shareWechat">
          <svg-icon name="wechat" size="25px" />
        </a>
        <a @click="shareWeibo">
          <svg-icon name="weibo" size="25px" />
        </a>
        <a @click="shareTwitter">
          <svg-icon name="twitter" size="25px" />
        </a>
      </div>
    </section>
    <section v-if="book.intro">
      <h3>简介</h3>
      <div v-html="book.intro"></div>
    </section>
    <section v-if="book.toc">
      <h3>目录</h3>
      <book-toc :content="book.toc"></book-toc>
    </section>
    <section>
      <h3>下载</h3>
      <ul v-if="links.length" class="links">
        <li v-for="link in links" :key="link.format">
          <a :href="link.url" target="_blank">{{formats[link.format]}} {{link.format==9?'':'格式下载'}}</a>
          <a style="margin-left:20px;" @click="showQrModal(link.url)">扫二维码下载</a>
        </li>
      </ul>
      <div v-else>
        <div style="margin-bottom:15px;">
          <p style="margin:0 0 5px">公众号『极客精神』二维码：</p>
          <img style="width:200px" src="~assets/img/geekgist.png" />
        </div>
        <p style="font-size:16px;">你本地的下载密钥已过期，请在公众号『极客精神』发送消息
          <b style="color:red;">bookist.cc</b> 获得新的下载密钥。密钥有效期为一个月左右，输入后会自动存储在本地，下次无需重复输入。</p>
        <div class="key-input-form">
          <div>
            <input type="text" class="u-input" v-model="key" placeholder="请输入密钥" @keyup.enter="submitKey()" />
            <v-button type="primary" :disabled="!key" @click="submitKey()">确定</v-button>
          </div>
          <div class="clearfix"></div>

        </div>
      </div>
    </section>

    <modal :show.sync="qrModalShow" class="qr-modal">
      <img id="qrCode" />
    </modal>
  </div>
</template>

<script>
import QRious from 'qrious'
import VButton from '~/components/Button'
import Modal from '~/components/Modal'
import BookToc from '~/components/BookToc'

import { bookApi } from '@/api'

export default {
  layout: 'master',
  validate({ params }) {
    return !!params.id
  },
  components: { Modal, BookToc, VButton },
  head() {
    return {
      title: `${this.book.title}[${this.formatStr}]下载`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.headDescription,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            this.book.tags.map(x => x.name).join(', ') +
            ', pdf, azw3, epub, mobi, 电子书, E-book, 下载, Download',
        },
      ],
    }
  },
  async asyncData({ app, params }) {
    let book = await bookApi.getById(params.id)
    return { book }
  },
  data() {
    return {
      qrModalShow: false,
      formats: {
        1: 'PDF',
        2: 'AZW3',
        3: 'EPUB',
        4: 'MOBI',
        9: '在线阅读',
      },
      links: [],
      key: ''
    }
  },
  computed: {
    shareText() {
      return `分享一本电子书：《${this.book.title.replace(
        '#',
        '%23'
      )}》，免费下载：${this.fullUrl}`
    },
    fullUrl() {
      return window.location.href
    },
    headDescription() {
      return (
        `电子书《${this.book.title}》${this.formatStr}等格式免费下载。` +
        (this.book.subtitle || '')
      )
    },
    formatStr() {
      return this.links.map(x => this.formats[x.format]).join(', ')
    },
  },
  methods: {
    openWindow(url) {
      const w = 600
      const h = 400
      const left = screen.width / 2 - w / 2
      const top = screen.height / 2 - h / 2
      return window.open(
        url,
        '',
        'toolbar=no,location=no,directories=no,status=no,menubar=no,' +
        `width=${w}, height=${h}, top=${top}, left=${left}`
      )
    },
    shareTwitter() {
      this.openWindow(`https://twitter.com/intent/tweet?text=${this.shareText}`)
    },
    shareWeibo() {
      this.openWindow(
        `http://service.weibo.com/share/share.php?title=${this.shareText}&url=${this.fullUrl}`
      )
    },
    shareWechat() {
      this.showQrModal(window.location.href)
    },
    showQrModal(url) {
      this.qrModalShow = true
      if (!this.qr) {
        this.qr = new QRious({
          element: document.getElementById('qrCode'),
          size: 300,
        })
      }
      this.qr.value = url
    },
    submitKey() {
      if (!this.key) return
      bookApi.getLinks(this.book.id, this.key).then(links => {
        this.links = links
        localStorage.setItem('download-key', this.key)
      })
    }
  },
  mounted() {
    this.key = localStorage.getItem('download-key')
    if (this.key) {
      bookApi.checkDownloadKey(this.key).then(valid => {
        if (valid) {
          bookApi.getLinks(this.book.id, this.key).then(links => {
            this.links = links
          })
        } else {
          localStorage.removeItem('download-key')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.p-book {
  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  section {
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px dashed $color-border-darker;
    h3 {
      font-size: 15px;
      font-weight: bold;
      border-left: 5px solid $color-border-darker;
      padding: 0 8px;
      line-height: 1.2;
      margin-bottom: 15px;
    }
    pre {
      white-space: pre-wrap;
    }
    p {
      margin-bottom: 10px;
    }
  }

  .cover {
    border-radius: 4px;
    height: 160px;
    max-width: 120;
  }

  .meta {
    margin-left: 2px;
    dl {
      margin-bottom: 0;
      word-break: break-all;
    }
    dt {
      display: inline-block;
      width: 40px;
      text-align: justify;
      text-align-last: justify;
      letter-spacing: -1px;
    }
    dd {
      display: inline;
    }
    .tags {
      margin-top: 10px;
    }
  }

  .share {
    margin-top: 10px;
    h5 {
      color: rgba(0, 0, 0, 0.44);
      font-size: 12px;
      float: left;
      line-height: 30px;
      margin-right: 10px;
    }
    a {
      margin-right: 10px;
      .icon {
        fill: rgba(0, 0, 0, 0.44);
      }
      &:hover .icon {
        fill: $color-2;
      }
    }
  }

  @include respond(sm) {
    .section-info {
      display: flex;
    }
    .cover {
      height: 200px;
      max-width: 150px;
      flex: 0 0 auto;
      margin-right: 10px;
    }
    .meta {
      flex: 1 1 auto;
      dl {
        margin-bottom: 6px;
      }
    }
    .share {
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      a {
        display: block;
        margin-top: 2px;
      }
    }
  }

  .links {
    li {
      margin-top: 10px;
      display: block;
      a {
        font-weight: bold;
        border-bottom: 1px dashed #ccc;
      }
    }
  }
  .qr-modal .modal-dialog {
    text-align: center;
  }

  .key-input-form {
    min-height: 70px;
    input,
    button {
      float: left;
      margin-right: 15px;
    }
  }
}
</style>
