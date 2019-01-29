<template>
  <router-link :to="'/book/'+book.id" class="book-card">
    <img :alt="book.title + ' 封面'" :src="$imgUrl(book.cover,'h160')" class="book-card__cover" />
    <h3 class="u-ellipsis" :title="book.title">{{ book.title }}</h3>
    <p class="book-card__author u-ellipsis">{{ book.author }}</p>
    <div class="book-card__tags u-ellipsis">
      <span v-for="tag in book.tags" :key="tag.id" class="tag">
        {{ tag.name }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
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
  display: block;
  height: 280px;
  padding: 0 12px 10px;
  text-align: center;
  background: #fff;
  transition: all 0.2s linear;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }
  img {
    width: auto;
    height: 150px;
  }
  h3 {
    font-size: 17px;
    margin: 10px 0 5px;
  }
  &__author {
    font-size: 14px;
    color: #777;
  }
  &__tags {
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 12px;
    .tag ~ .tag {
      margin-left: 10px;
    }
  }
}
</style>


