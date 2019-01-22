<template>
  <div v-if="total>size" class="paginator">
    <button v-if="currentPage!=1" class="button is-white" @click="handClick(currentPage-1)">
      &lt; 上一页
    </button>
    <span class="page">· 第 {{ currentPage }} 页 ·</span>
    <button v-if="total>currentPage*size" class="button is-white" @click="handClick(currentPage+1)">
      下一页 &gt;
    </button>
    <span v-else class="button is-light" disabled style="padding-right:1px">50页以外请使用搜索</span>
  </div>
</template>

<script>
export default {
  props: {
    total: { type: Number, default: 0 },
    page: { type: [Number, String], default: 1 },
    size: { type: Number, required: true },
    // where page value from. "query" or "params"
    where: { type: String, default: 'query' }
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
        const page = this.currentPage > 2 ? this.currentPage - 1 : undefined
        return {
          path: this.$route.path,
          query: Object.assign(this.$route.query, { page: page })
        }
      }
    },
    nextLink() {
      const nextPage = this.currentPage + 1
      if (this.where === 'params') {
        return `/page/${nextPage}`
      } else {
        return {
          path: this.$route.path,
          query: Object.assign(this.$route.query, { page: nextPage })
        }
      }
    }
  },
  watch: {
    page(val) {
      if (parseInt(val) === this.currentPage) return
      this.currentPage = val
    }
  },
  methods: {
    handClick(page) {
      this.$emit('change', page, this.currentPage)
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


