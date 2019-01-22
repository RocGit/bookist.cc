<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://bookist.cc">
          <!-- <img src="" width="112" height="28"> -->
          <strong class="u-colorfulText">书大师 BOOKIST.CC</strong>
        </a>
        <a role="button" class="navbar-burger burger" @click="isMenuActive = !isMenuActive">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div :class="{'navbar-menu':true, 'is-active':isMenuActive}" @click="isMenuActive=false">
        <div class="navbar-start">
          <router-link to="/" exact class="navbar-item">首页</router-link>
          <!-- <a class="navbar-item">标签</a> -->
          <router-link to="/qq-group" class="navbar-item">QQ群</router-link>
          <a class="navbar-item" href="https://github.com/liamwang/bookist.cc" target="_blank">GitHub</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="search-wrapper">
              <input v-model="keyword" type="search" placeholder="你要找什么书？" @click.stop="()=>{}" @keyup.enter="search" />
              <svg-icon name="search" size="30px" @click.stop="search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      isMenuActive: false
    }
  },
  methods: {
    search() {
      if (this.keyword && this.keyword.trim().length > 0) {
        this.isMenuActive = false
        this.$router.push({ path: '/search', query: { q: this.keyword } })
        this.keyword = ''
      }
    }
  }
}
</script>

<style lang="scss">
.navbar {
  margin-bottom: 25px;
  .navbar-item.is-active {
    color: #7957d5 !important;
  }
}
.search-wrapper {
  position: relative;
  height: 30px;
  input[type='search'] {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    border: none;
    outline: none;
    background: none;
    width: 0;
    height: 30px;
    line-height: 28px;
    padding: 2px;
    padding-right: 32px;
    cursor: pointer;
    font-size: 100%;
    transition: all 0.5s;
    border-bottom: 1px solid transparent;
    &:focus {
      z-index: 1;
      border-bottom-color: #c678db;
      width: 320px;
      cursor: text;
    }
  }
  .icon-search {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 5px;
  }
}
.navbar-menu.is-active .search-wrapper {
  input[type='search'] {
    padding-left: 35px;
    width: 100%;
    border-bottom-color: #c678db;
  }
  input[type='search'],
  .icon-search {
    left: 0;
  }
}
</style>


