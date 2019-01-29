<template>
  <div class="p-admin-books">

    <div class="columns">
      <div class="column field is-grouped">
        <div class="control is-expanded" style="max-width:300px">
          <input v-model="page.keyword" class="input" @keyup.enter.native="queryData(1)" />
        </div>
        <div class="control">
          <button class="button is-info" @click="queryData(1)">查 询</button>
        </div>
      </div>
      <div class="column is-2 field" style="text-align:right;">
        <button class="button " @click="$router.push('/admin/book-edit')">添加书籍</button>
      </div>
    </div>

    <div class="columns is-multiline">
      <div v-for="(book,index) in books" :key="book.id" class="column is-3">
        <div class="book">
          <img class="book__cover" :src="$imgUrl(book.cover,'h160')" />
          <div v-show="book.status==0" class="book__status">未发布</div>
          <div class="book__title u-ellipsis" :titile="book.title">
            {{ book.title }}
          </div>
          <div class="book__buttons">
            <a class="button is-small is-danger" @click="onDelete(book, index)">删除</a>
            <router-link :to="{path:'/admin/book-edit',query:{id:book.id}}" class="button is-small is-primary">编辑</router-link>
            <a :href="`/book/${book.id}`" class="button is-small" target="_blank">查看</a>
          </div>
        </div>
      </div>
    </div>

    <b-pagination :total="page.total" :current.sync="page.page" :per-page="page.size" @change="queryData">
    </b-pagination>
  </div>
</template>

<script>
import { bookApi } from '@/api/admin'

export default {
  layout: 'admin',
  data() {
    return {
      page: {
        total: 0,
        page: 1,
        size: 20,
        keyword: '',
        status: null
      },
      books: []
    }
  },
  mounted() {
    this.queryData(1)
  },
  methods: {
    queryData(current) {
      this.page.page = current || 1
      bookApi.get(this.page).then(data => {
        if (current === 1) {
          this.page.total = data.total
        }
        this.books = data.list
      })
    },
    onDelete(book, index) {
      this.$dialog.confirm({
        title: '删除书籍',
        message: '此操作无法撤回，您确定要<b>删除</b>吗? 。',
        confirmText: '删除',
        cancelText: '取消',
        type: 'is-danger',
        // hasIcon: true,
        onConfirm: () =>
          bookApi.delete(book.id).then(x => {
            this.books.splice(index, 1)
            this.$toast.open('删除成功!')
            this.queryData(1)
          })
      })
    }
  }
}
</script>


<style lang="scss">
.p-admin-books {
  .book {
    position: relative;
    border: 1px solid #eee;
    overflow: hidden;
    height: 220px;
    text-align: center;
    &__cover {
      width: auto;
      height: 180px;
    }
    &__status {
      position: absolute;
      width: 80px;
      top: 0;
      left: calc(50% - 40px);
      background: hsl(348, 100%, 61%);
      color: #fff;
      font-weight: bold;

      text-align: center;
    }
    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover .book__buttons {
      opacity: 1;
    }
  }
}
</style>
