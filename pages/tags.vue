<template>
  <div class="p-tags">
    <h1>所有标签</h1>
    <div class="tags clearfix">
      <div v-for="tag in tags" :key="tag.id" class="tag-item">
        <router-link :to="`/tag/${tag.id}`">{{ tag.name }}</router-link>
        <span> ({{ tag.bookCount }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { tagApi } from '@/api'

export default {
  head: {
    title: '所有标签'
  },
  async asyncData({ app }) {
    let tags = await tagApi.getAll()
    return { tags }
  }
}
</script>

<style lang="scss">
.p-tags {
  background: #fff;
  padding: 15px 15px 20px 25px;
  /* min-height: calc(100vh - 240px); */
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .tags {
    position: relative;
    margin-left: -15px;
    margin-right: -15px;
  }
  .tag-item {
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    width: 50%;
    a {
      font-weight: bold;
    }
    span {
      color: $color-text-light;
    }
    @include respond(md) {
      width: 33.33%;
    }
    @include respond(lg) {
      width: 25%;
    }
    @include respond(xl) {
      width: 20%;
    }
  }
}
</style>


