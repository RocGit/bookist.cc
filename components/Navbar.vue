<template>
  <div class="navbar">
    <div class="container">
      <div class="u-flex">
        <a class="nav-trigger" @click="showModal=true">
          <svg-icon name="menu" size="20px" :colorful="true" />
        </a>
        <div class="navs">
          <a class="logo u-colorfulText" href="/" title="bookist.cc">
            书大师
          </a>
          <router-link to="/">首页</router-link>
          <router-link to="/tags">所有标签</router-link>
          <router-link to="/qq-group">加入QQ群</router-link>
        </div>
        <router-link to="/search">
          <svg-icon name="search" size="20px" :colorful="true" />
        </router-link>
      </div>
    </div>
    <modal :show.sync="showModal" class="navs-modal" :showClose="false">
      <div class="navs-m">
        <a @click="showModal=false">
          <svg-icon name="close" size="20px" />
        </a>
        <a @click="navigate('/')">首页</a>
        <a @click="navigate('/tags')">所有标签</a>
        <a @click="navigate('/qq-group')">加入QQ群</a>
        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=SSUgKCRnPignLgk4OGcqJiQ" target="_blank">联系站长</a>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
export default {
  components: { Modal },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    navigate(to) {
      this.showModal = false
      this.$router.push(to)
    }
  }
}
</script>

<style lang="scss">
.navbar {
  padding: 10px 0;
  line-height: 30px;
  // background-color: #fff;
  border-bottom: 2px solid $color-border;
  margin-bottom: 20px;
  .icon {
    padding-top: 3px;
  }
  .u-flex {
    justify-content: space-between;
  }
  .logo {
    display: block;
    font-size: 16px;
    font-weight: 700;
  }
  .navs a {
    display: none;
    &.logo {
      display: inline-block;
    }
  }
  .navs-m {
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    a {
      display: inline-block;
      padding: 0 10px;
      margin-bottom: 6px;
      font-size: 16px;
    }
  }
  .nuxt-link-exact-active {
    color: $color-1;
  }
  @include respond(md) {
    .nav-trigger {
      display: none;
    }
    .navs a {
      display: inline-block;
      margin-right: 30px;
      &.logo {
        margin-right: 50px;
      }
    }
  }
}
</style>


