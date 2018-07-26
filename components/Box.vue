<template>
  <div class="box" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: String
  },
  computed: {
    style() {
      return {
        padding: this.padding
      }
    }
  }
}
</script>

<style lang="scss">
.box {
  border: 2px solid $color-border;
  border-radius: 5px;
  padding: 3px;
  box-shadow: 0 1px 1px 0 rgba($color-bg, 0.1);
}
</style>


