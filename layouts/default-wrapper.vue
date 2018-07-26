<template>
  <div>
    <svg-icon name="_defs" size="0" />
    <navbar />
    <slot />
    <v-footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import VFooter from '~/components/Footer'
export default {
  components: { Navbar, VFooter },
  mounted() {
    // console.log('📢 Hi there :)')
    // console.log('📢 I 👀 see 👀 you 👀')
    console.log("📢 Hope you're having a great day 😊")
  }
}
</script>
