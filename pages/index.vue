<template>
  <div class="p-home">
    <h2 class="tag-title" v-if="$route.query.tag">标签：{{$route.query.tag}}</h2>
    <div class="u-flexWrap">
      <book-card v-for="book in data.list" :key="book.id" :book="book" />
    </div>
    <paginator :page="$route.query.page || 1" :size="size" :total="data.total" @change="onPage" />
  </div>
</template>

<script>
import BookCard from '../components/BookCard'
import Paginator from '../components/Paginator'
export default {
  layout: 'master',
  components: { BookCard, Paginator },
  head: {
    title: '书大师 - 优质电子书资源分享',
    titleTemplate: null
  },
  async asyncData({ app, route, redirect }) {
    const size = 12
    let page = route.query.page || 1
    if (page > 50) {
      redirect(302, '/search')
      return
    }
    let data = await app.$axios.$get('/books', {
      params: { page: route.query.page || 1, size, tag: route.query.tag }
    })
    return { data, size } //  data = {list, total}
  },
  methods: {
    onPage(page) {
      let query = Object.assign({}, this.$route.query, {
        page: page > 1 ? page : undefined
      })
      this.$router.push({ path: '/', query: query })
    }
  }
}
</script>

<style lang="scss">
.p-home {
  .tag-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  > .u-flexWrap {
    align-content: flex-start;
  }
  .book-card {
    width: 100%;
    margin-bottom: 20px;
    @include respond(md) {
      width: calc(50% - 10px);
    }
  }
}
</style>
