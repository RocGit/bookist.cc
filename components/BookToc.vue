<template>
  <div class="book-toc">
    <div v-if="contentShort==contentLong" v-html="contentLong"></div>
    <transition name="fade" mode="out-in">
      <div v-if="expanded" key="expanded">
        <div v-html="contentLong"></div>
        <div class="more-opt" v-if="contentShort!=contentLong">· · ·
          <a @click="expanded=false"> 收起 </a> · · ·
        </div>
      </div>
      <div v-else key="not-expanded">
        <div v-html="contentShort"></div>
        <div class="more-opt" v-if="contentShort!=contentLong">· · ·
          <a @click="expanded=true"> 展开 </a> · · ·
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: { content: String },
  computed: {
    contentShort() {
      if (!this.content) return ''
      let idx = this.content.indexOf('\n', 600)
      if (idx < 0) return this.content
      return this.content.substring(0, idx)
    },
    contentLong() {
      if (!this.content) return ''
      return this.content
    }
  },
  data() {
    return {
      expanded: false
    }
  }
}
</script>

<style lang="scss">
.more-opt {
  margin-top: 15px;
}
</style>


