<template>
  <button :disabled="disabled" class="btn" @click="handleClick" :autofocus="autofocus" :type="nativeType" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    disabled: Boolean,
    autofocus: Boolean
  },
  computed: {
    classes() {
      return [
        this.type ? 'btn-' + this.type : '',
        {
          isDisabled: this.disabled
        }
      ]
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
.btn {
  display: inline-block;
  position: relative;
  height: 36px;
  line-height: 34px;
  padding: 0 16px;
  background: transparent;
  cursor: pointer;
  color: $color-text-normal;
  border: 2px solid $color-border-darker;
  overflow: hidden;
  // border-radius: 999em;
  border-radius: 5px;
  text-align: center;
  vertical-align: middle;
  text-rendering: optimizeLegibility;
  transition: 0.2s background-color, 0.2s border-color, 0.3s color,
    0.2s box-shadow;
  &:hover {
    color: $color-text-light;
    border-color: $color-border;
  }
  &:active {
    color: $color-3;
    border: 2px solid $color-3;
    box-shadow: 0 0 3px rgba($color-3, 0.2);
  }
  & + .btn {
    margin-left: 10px;
  }
  &[disabled] {
    cursor: not-allowed;
    color: $color-border-darker;
    border-color: $color-border;
    &:hover {
      border-color: $color-border;
    }
  }
}

.btn-primary {
  color: $color-primary;
  border-color: $color-primary;
  &:hover {
    color: $color-primary-darker;
    border-color: $color-primary-darker;
  }
}
</style>

