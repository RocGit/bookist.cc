<template>
  <div class="p-home">
    <h2 class="tag-title" v-if="$route.name == 'tag'">标签：{{$route.params.tag}}</h2>
    <div class="u-flexWrap">
      <book-card v-for="book in data.list" :key="book.id" :book="book" />
    </div>
    <paginator :page="$route.name=='tag'?$route.query.page:$route.params.page" :size="size" :total="data.total" @change="onPage" />
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
    title: '书大师 - 优质电子书资源分享',
    titleTemplate: null,
  },
  watchQuery: ['page'],
  async asyncData({ app, route, redirect }) {
    const size = 12
    const query = {size: 12, page: 1, tag: undefined}

    if (route.name === 'tag') {
      query.page = route.query.page || 1
      query.tag = route.params.tag
    } else { // route.name === 'page'
      query.page = route.params.page || 1
    }

    if (query.page > 50) {
      redirect(302, '/search')
      return
    }

    let data = await bookApi.get(query)
    return { data, size } //  data = {list, total}
  },
  methods: {
    onPage(nextPage, prevPage) {
      const page = nextPage === 1 ? undefined : nextPage
      if (this.$route.name === 'tag') {
        this.$router.push({path: this.$route.path, query: {page}})
      } else {
        page ? this.$router.push(`/page/${page}`) : this.$router.push('/')
      }
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
