<template>
  <div class="p-home">
    <h2 v-if="data.payload">【{{ data.payload }}】相关的电子书</h2>
    <div class="columns is-multiline is-mobile">
      <div v-for="book in data.list" :key="book.id" class="column is-3-desktop is-4-tablet is-6-mobile">
        <book-card :book="book" />
      </div>
    </div>

    <div v-if="$route.name=='search' && data.list.length==0">
      <p>🙁 很抱歉，没有找到你要的书！</p>
    </div>

    <!-- 分页，只对前50页，超出提示用户使用搜索 -->
    <paginator :page="query.page" :size="12" :total="data.total" @change="onPage" />
  </div>
</template>

<script>
import BookCard from '../components/BookCard'
import Paginator from '../components/Paginator'
import { bookApi } from '../api'

export default {
  components: { BookCard, Paginator },
  head: {
    title: '书大师 - 优质电子书资源分享',
    titleTemplate: null
  },
  watchQuery: true, //['page', 'q'],
  async asyncData({ app, route, redirect }) {
    const query = { page: route.params.page || 1 }

    if (route.name === 'tag' || route.name === 'search') {
      query.page = route.query.page || 1
      query.tag = route.params.tag
      query.keyword = route.query.q
    }

    if (query.page > 50) {
      redirect(302, '/search')
      return
    }

    let data = await bookApi.get(query)
    return { data, query } //  data = {list, total}
  },
  methods: {
    onPage(nextPage, prevPage) {
      const page = nextPage === 1 ? undefined : nextPage
      if (this.$route.name === 'tag') {
        this.$router.push({ path: this.$route.path, query: { page } })
      } else {
        page ? this.$router.push(`/page/${page}`) : this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
.p-home {
  > h2 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #8c9ba5;
  }
}
</style>
