<template>
  <default-wrapper>
    <div class="container u-flexWrap master">
      <main>
        <nuxt/>
      </main>
      <sidebar />
    </div>
  </default-wrapper>
</template>

<script>
import Sidebar from '../components/Sidebar'
import DefaultWrapper from './default-wrapper'
export default {
  layout: 'default',
  components: { Sidebar, DefaultWrapper }
}
</script>

<style lang="scss">
.master {
  main {
    width: 100%;
  }
  aside {
    width: 100%;
  }
  @include respond(lg) {
    main {
      width: 72%;
    }
    aside {
      width: 25%;
    }
  }
}
</style>



