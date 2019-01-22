<template>
  <div class="layout layout-default">
    <svg-icon name="_defs" size="0" />
    <!--
    <a class="github-fork-ribbon" href="https://github.com/liamwang/bookist.cc"
      data-ribbon="Fork me on GitHub" title="Fork me on GitHub">
      Fork me on GitHub
    </a>
    -->
    <navbar />

    <div class="container">
      <div class="columns is-desktop">
        <div class="column">
          <nuxt />
        </div>
        <sidebar class="column is-2-desktop"></sidebar>
      </div>
    </div>

    <footerbar />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import Footerbar from '~/components/Footerbar'
export default {
  components: { Navbar, Sidebar, Footerbar },
  mounted() {
    // console.log('📢 Hi there :)')
    // console.log('📢 I 👀 see 👀 you 👀')
    console.log("📢 Hope you're having a great day 😊")
  }
}
</script>

<style lang="scss">
.github-fork-ribbon {
  display: none;
  @media (min-width: 1400px) {
    display: block;
  }
}
</style>

