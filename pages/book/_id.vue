<template>
  <div class="p-book">
    <section class="book-info">
      <div class="columns">
        <div class="book-info__cover column is-2-tablet">
          <img :alt="book.title + ' 封面'" :src="$imgUrl(book.cover,'w180')" />
        </div>
        <div class="book-info__body column">
          <h1>{{ book.title }}</h1>
          <h2 v-if="book.subtitle">{{ book.subtitle }}</h2>
          <dl>
            <dt>作 者：</dt>
            <dd>{{ book.author }}</dd>
          </dl>
          <dl>
            <dt>日 期：</dt>
            <dd>{{ book.publishDate | month }}</dd>
          </dl>
          <dl>
            <dt>ISBN：</dt>
            <dd>{{ book.isbn }}</dd>
          </dl>
          <div class="tags">
            <router-link v-for="tag in book.tags" :key="tag.id" :to="`/tag/${tag.id}`" class="tag">
              {{ tag.name }}
            </router-link>
          </div>
        </div>
        <div class="book-info__share">
          <a @click="openWindow(`http://service.weibo.com/share/share.php?title=${shareText}&url=${fullUrl}`)">
            <svg-icon name="weibo" size="25px" />
          </a>
          <a @click="openWindow(`https://twitter.com/intent/tweet?text=${shareText}`)">
            <svg-icon name="twitter" size="25px" />
          </a>
        </div>
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
          <a :href="link.url" target="_blank">
            {{ formats[link.format] }} {{ link.format>=7?'':'格式下载' }}
          </a>
        </li>
      </ul>

      <div v-else class="fetch-code columns">
        <div class="fetch-code__qr column is-narrow">
          <p>扫码关注『极客精神』公众号</p>
          <img alt="公众号：极客精神" src="~assets/img/geekgist.png" />
        </div>
        <div class="column content">
          <h4>请在公众号『极客精神』发送消息 <b style="color:red;">bookist.cc</b> 获取提取码</h4>
          <p class="is-small">此提取码有效期为一个月左右，输入后会自动存储在本地，下次无需重复输入。</p>
          <div class="field has-addons has-addons-centered">
            <div class="control">
              <input v-model="code" class="input is-medium" placeholder="请输入提取码" @keyup.enter="submitCode" />
            </div>
            <div class="control">
              <button class="button is-primary is-medium" @click="submitCode">确定</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BookToc from '@/components/BookToc'
import { bookApi } from '@/api'

export default {
  layout: 'master',
  validate({ params }) {
    return !!params.id
  },
  components: { BookToc },
  head() {
    return {
      title: `${this.book.title}[${this.formatStr}]下载`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.headDescription
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            this.book.tags.map(x => x.name).join(', ') +
            ', pdf, azw3, epub, mobi, 电子书, E-book'
        }
      ]
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
        7: '点击下载',
        9: '在线阅读'
      },
      links: [],
      code: ''
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
    }
  },
  mounted() {
    const code = localStorage.getItem('download-code')
    if (!code) return
    bookApi.getLinks(this.book.id, code).then(data => {
      if (data.isValid) this.links = data.links
      else localStorage.removeItem('download-code')
    })
  },
  methods: {
    openWindow(url) {
      const w = 600
      const h = 400
      const left = screen.width / 2 - w / 2
      const top = screen.height / 2 - h / 2
      const features = `toolbar=no,location=no,directories=no,status=no,menubar=no,width=${w}, height=${h}, top=${top}, left=${left}`
      return window.open(url, '', features)
    },
    submitCode() {
      if (!this.code) return
      bookApi.getLinks(this.book.id, this.code).then(data => {
        if (data.isValid) {
          this.links = data.links
          localStorage.setItem('download-code', this.code)
        } else {
          this.$toast.open({
            message: '提取码不正确或已过期',
            type: 'is-danger'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.p-book {
  background: #fff;
  > section {
    position: relative;
    padding: 30px;
    border-bottom: 1px solid #eee;
    > h3 {
      font-size: 17px;
      font-weight: bold;
      border-left: 6px solid rgba(0, 0, 0, 0.4);
      padding: 0 8px;
      line-height: 1.2;
      margin-bottom: 15px;
    }
    pre {
      white-space: pre-wrap;
    }
  }

  .book-info {
    &__cover {
      min-width: 180px;
      text-align: center;
    }
    &__body {
      min-width: 300px;
      > h1 {
        font-size: 25px;
        font-weight: bold;
      }
      > h2 {
        font-size: 17px;
        margin-bottom: 1rem;
      }
      dt,
      dd {
        font-size: 15px;
        display: inline-block;
        padding-bottom: 8px;
      }
      dt {
        font-weight: bold;
      }
      .tags {
        margin-top: 8px;
      }
    }
    &__share {
      position: absolute;
      top: 40px;
      right: 30px;
      text-align: center;
      h5 {
        color: rgba(0, 0, 0, 0.6);
      }
      a {
        display: block;
        margin-top: 2px;
      }
    }
  }

  .fetch-code {
    &__qr {
      text-align: center;
      > p {
        font-size: 14px;
        color: #666;
      }
      > img {
        width: 200px;
      }
    }
    .content {
      text-align: center;
      padding: 20px 0;
      h4 {
        font-size: 18px;
      }
      p {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.6);
        margin: 25px 0 50px;
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
}
</style>
