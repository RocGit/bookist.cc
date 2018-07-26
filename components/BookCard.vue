<template>
  <box class="book-card u-flex" @click.native="$router.push('/book/'+book.id)">
    <img :alt="book.title + ' 封面'" :src="$imgUrl(book.coverId,'w120')" class="cover u-flex0" />
    <div class="meta u-flex1">
      <h2>
        <router-link :to="'/book/'+book.id">{{book.title}}</router-link>
      </h2>
      <h3 class="u-ellipsis">作者：{{book.author}}</h3>
      <p class="intro">{{book.intro}}</p>
    </div>
  </box>
</template>

<script>
import Box from './Box'
export default {
  components: { Box },
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.book-card {
  height: 160px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 30px rgba($color-border, 0.9);
    transition: all 0.15s ease;
    .cover {
      opacity: 0.9;
    }
    a {
      color: $color-3;
    }
  }
  .cover {
    height: 100%;
    max-width: 120px;
  }
  .meta {
    height: calc(100% - 10px);
    overflow: hidden;
    padding: 10px 12px;
  }
  h2 {
    font-size: 16px;
    line-height: 1.2;
    font-weight: 700;
  }
  h3 {
    margin-top: 5px;
  }
  .intro {
    margin-top: 5px;
    font-size: 13px;
  }
}
</style>


