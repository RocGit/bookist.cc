<template>
  <div class="book-toc">
    <div v-if="contentShort==contentLong" v-html="contentLong"></div>
    <div v-else>
      <transition name="fade" mode="out-in">
        <div v-if="expanded" key="expanded">
          <div v-html="contentLong"></div>
          <div v-if="contentShort!=contentLong" class="more-opt">· · ·
            <a @click="expanded=false"> 收起 </a> · · ·
          </div>
        </div>
        <div v-else key="not-expanded">
          <div v-html="contentShort"></div>
          <div v-if="contentShort!=contentLong" class="more-opt">· · ·
            <a @click="expanded=true"> 展开 </a> · · ·
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: String, default: '' }
  },
  data() {
    return {
      expanded: false
    }
  },
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
  }
}
</script>

<style lang="scss">
.more-opt {
  margin-top: 15px;
}
</style>


