<template>
  <div class="layout layout-admin">
    <svg-icon name="_defs" size="0" />
    <navbar />

    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <ul class="menu-list">
            <li>
              <nuxt-link to="/admin" exact>图书管理</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/admin/book-edit">添加图书</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="column">
          <nuxt class="content-body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: { Navbar },
  mounted() {}
}
</script>

<style lang="scss">
.layout-admin {
  .menu-list > li {
    margin-bottom: 10px;
  }
  .content-body {
    background: #fff;
    height: 100%;
    padding: 20px 25px 40px;
  }
}
</style>

