<template>
  <div class="p-search">
    <h1>搜索</h1>
    <div class="search-bar">
      <input type="search" class="u-input" v-model="keyword" placeholder="你在找什么书？" @keyup.enter="search(1)" />
    </div>
    <div v-if="showEmpty" class="search-none">
      <p>🙁 很抱歉，没有找到你要的书！</p>
      <p>不要灰心，你可以
        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=SSUgKCRnPignLgk4OGcqJiQ" target="_blank">联系站长</a>，让他帮你找找看 😊
      </p>
    </div>
    <div v-if="data.total>0" class="search-result">
      <p>找到了
        <b>{{data.total}}</b> 本相关书籍</p>
      <div class="u-flexWrap books">
        <book-card v-for="book in data.list" :key="book.id" :book="book" />
      </div>
    </div>
    <paginator :page="$route.query.page || 1" :size="size" :total="data.total" @change="onPage" />
  </div>
</template>

<script>
import BookCard from '../components/BookCard'
import Paginator from '../components/Paginator'
import { bookApi } from '../api'

export default {
  layout: 'master',
  components: { BookCard, Paginator },
  head: {
    title: '找书',
  },
  watchQuery: ['page', 'q'],
  async asyncData({ app, query }) {
    const ssrData = {
      size: 12,
      showEmpty: false,
      data: { list: [], total: 0 },
    }
    if (query.q) {
      ssrData.data = await bookApi.get({
        page: query.page || 1,
        size: ssrData.size,
        keyword: query.q,
      })
      ssrData.showEmpty = !ssrData.data.list.length
    }
    return ssrData
  },
  data() {
    return { keyword: this.$route.query.q }
  },
  methods: {
    onPage(page) {
      this.$router.push({
        path: '/search',
        query: { page: page > 1 ? page : undefined, q: this.keyword },
      })
    },
    search() {
      if (!this.keyword || !(this.keyword + '').trim()) return
      this.$router.push({ path: '/search', query: { q: this.keyword } })
    },
  },
}
</script>

<style lang="scss">
.p-search {
  h1 {
    font-size: 18px;
    margin-bottom: 15px;
    color: $color-text-light;
  }
  .books {
    align-content: flex-start;
  }
  .book-card {
    width: 100%;
    margin-bottom: 20px;
    @include respond(md) {
      width: calc(50% - 10px);
    }
  }
  .search-bar {
    margin-bottom: 20px;
    input {
      display: block;
      width: 100%;
    }
  }
  .search-result {
    > p {
      margin-bottom: 15px;
    }
  }
  .search-none {
    p:first-child {
      color: #333;
      font-size: 20px;
      margin-bottom: 15px;
    }
  }
}
</style>
