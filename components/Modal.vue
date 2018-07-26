<template>
  <transition name="modal-fade">
    <div v-show="show" tabindex="-1" class="modal" @keyup.esc="hide" @click="hide">
      <a class="modal-close" v-if="showClose" @click="hide">
        <svg-icon name="close" size="20px" />
      </a>
      <div class="modal-dialog modal-dialog--animate" :style="dialogStyle" v-on:click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'md'
    },
    width: String,
    height: String,
    showClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  methods: {
    hide(cancel) {
      this.$emit('update:show', false)
    }
  },
  watch: {
    show(val) {
      this.$emit('update:show', val)
      if (val) {
        this.$emit('open')
        this.$nextTick(() => {
          this.$el.focus()
        })
      } else {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vm;
  height: 100vh;
  overflow: auto;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.9);
  outline: none;
  &-dialog {
    overflow: hidden;
  }
  &-close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 19px;
    padding: 10px 20px;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes fade-in-pulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  70%,
  100% {
    transform: scale(1);
  }
}

.modal-dialog--animate {
  transform-origin: bottom center;
  animation: fade-in-pulse 0.3s forwards cubic-bezier(0.8, 0.02, 0.45, 0.91);
}
</style>
