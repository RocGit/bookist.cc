<template>
  <div class="paginator" v-if="total>size">
    <v-button :disabled="currentPage==1" @click="handClick(currentPage-1)">&lt; 上一页</v-button>
    <span class="page">
      <span class="sm">· · · · · · · · · · </span>
      · · · · 第 {{currentPage}} 页 · · · ·
      <span class="sm"> · · · · · · · · · ·</span>
    </span>
    <v-button :disabled="total<=currentPage*size" @click="handClick(currentPage+1)">下一页 &gt;</v-button>
  </div>
</template>

<script>
import VButton from './Button'
export default {
  components: { VButton },
  props: {
    total: { type: Number, default: 0 },
    page: { type: [Number, String], default: 1 },
    size: { type: Number, required: true },
    // where page value from. "query" or "params"
    where: {type: String, default: 'query'}
  },
  data() {
    return {
      currentPage: parseInt(this.page || 1)
    }
  },
  computed: {
    prevLink() {
      if (this.where === 'params') {
        return this.currentPage > 2 ? `/page/${this.currentPage - 1}` : '/'
      } else {
        const page = this.currentPage > 2 ? (this.currentPage - 1) : undefined
        return { path: this.$route.path, query: Object.assign(this.$route.query, {page: page}) }
      }
    },
    nextLink() {
      const nextPage = this.currentPage + 1
      if (this.where === 'params') {
        return `/page/${nextPage}`
      } else {
        return {path: this.$route.path, query: Object.assign(this.$route.query, {page: nextPage})}
      }
    }
  },
  methods: {
    handClick(page) {
      this.$emit('change', page, this.currentPage)
    },
  },
  watch: {
    page(val) {
      if (parseInt(val) === this.currentPage) return
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss">
.paginator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .sm {
    display: none;
  }
  .page {
    height: 36px;
    line-height: 38px;
    display: inline-block;
  }
  @include respond(sm) {
    .sm {
      display: inline-block;
    }
  }
}
</style>


