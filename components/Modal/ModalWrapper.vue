<template>
  <div v-hotkey="{ esc: close }" class="modal-wrapper" @click.self="close">
    <transition name="fade-scale">
      <div v-if="show" class="modal-inner" :class="`modal-inner_${size}`">
        <BIconX v-if="iconClose" class="modal-close" @click="close" />
        <slot v-bind="{ close }"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: 'ModalWrapper',
  inheritAttrs: false,
  props: {
    iconClose: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
    resolve: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.show = true
    this.$parent.$on('close', this.hide)
    // disableBodyScroll(this.$el);
  },
  beforeDestroy() {
    this.$parent.$off('close', this.hide)
    // enableBodyScroll(this.$el);
  },
  methods: {
    hide() {
      this.show = false
    },
    close(e, value) {
      this.resolve(value)
      this.hide()
      this.$emit('close', e)
    },
  },
}
</script>

<style lang="scss">
.modal-wrapper {
  cursor: pointer;

  > * {
    cursor: default;
  }
}

.modal-wrapper:not(.modal-wrapper_last) {
  display: none;
}
</style>
