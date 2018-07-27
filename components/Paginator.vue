<template>
  <div class="paginator" v-if="total>size">
    <router-link :to="prevLink">
      <v-button :disabled="currentPage==1">&lt; 上一页</v-button>
    </router-link>
    <span class="page">
      <span class="sm">· · · · · · · · · · </span>
      · · · · 第 {{currentPage}} 页 · · · ·
      <span class="sm"> · · · · · · · · · ·</span>
    </span>
    <router-link :to="nextLink">
      <v-button :disabled="total<=currentPage*size">下一页 &gt;</v-button>
    </router-link>
  </div>
</template>

<script>
import VButton from './Button'
export default {
  components: { VButton },
  props: {
    total: { type: Number, default: 0 },
    page: { type: [Number, String], default: 1 },
    size: { type: Number, required: true }
  },
  data() {
    return {
      currentPage: parseInt(this.page)
    }
  },
  computed: {
    prevLink() {
      return this.currentPage > 2 ? `/page/${this.currentPage - 1}` : '/'
    },
    nextLink() {
      return `/page/${this.currentPage + 1}`
    }
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


