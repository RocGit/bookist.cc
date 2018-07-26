<template>
  <span :class="cls" :style="style" v-html="svg" />
</template>

<script>
import icons from './icons'
export default {
  name: 'SvgIcon',
  props: {
    name: { type: String, required: true },
    size: { type: String, default: '16px' },
    colorful: Boolean
  },
  computed: {
    cls() {
      return [`icon icon-${this.name}`, { 'is-colorful': this.colorful }]
    },
    style() {
      return {
        width: this.size,
        height: this.size
      }
    },
    svg() {
      return icons[this.name]
    }
  }
}
</script>

<style lang="scss">
.icon {
  display: inline-block;
  position: relative;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  &.is-colorful [fill] {
    fill: url(#gradient);
  }
}
#gradient stop.start-color {
  stop-color: #ad5beb;
}

#gradient stop.end-color {
  stop-color: #e76e92;
}
.icon-_defs {
  position: absolute;
}
</style>

