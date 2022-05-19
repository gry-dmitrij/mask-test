<template>
  <transition-group class="modal-wrapper-list" name="fade" tag="div">
    <component
      :is="modal.name"
      v-for="(modal, k) in modals"
      :key="`${modal.name}-${k}`"
      :class="{ 'modal-wrapper_last': k + 1 === modals.length }"
      v-bind="modal.data"
      @close="close(modal.data.resolve)"
    ></component>
  </transition-group>
</template>

<script>
import Default from './Default.vue'
import Error from './Error.vue'

export default {
  name: 'ModalInstance',
  components: {
    Default,
    Error,
    // DynamicComponent: () => import('@/components/Modal/DynamicComponent'),
  },
  data() {
    return {
      modals: [],
      data: {},
      name: '',
    }
  },
  beforeMount() {
    this.$modal.subscribe(this.onToggle)
  },
  beforeDestroy() {
    this.$modal.unsubscribe(this.onToggle)
  },
  methods: {
    onToggle(name, state, params, resolve) {
      if (!state) {
        this.close(name)
        return
      }

      this.modals.push({
        name,
        data: {
          ...params,
          resolve,
        },
      })
    },
    // open(name, options) {
    //   if (!this.$parent) {
    //     this.$mount();
    //     document.querySelector('#__layout').appendChild(this.$el);
    //   }
    //
    //   return new Promise(resolve => {
    //
    //     this.data = {
    //       ...this.data,
    //       ...options,
    //       resolve
    //     };
    //
    //     this.name = name;
    //   });
    // },
    async close(name) {
      await this.$nextTick() // дожидаемся пересчета переменных враппера (анимация закрытия)
      if (!name) {
        name = this.modals.at(-1).name
      }
      const curModalIndex = this.modals.findIndex(
        (el) => el.name === name || el.data.resolve === name
      )
      if (curModalIndex === -1) {
        throw new Error("Can't find modal " + name)
      }
      const curModal = this.modals[curModalIndex]
      curModal.data.resolve(undefined) // на случай если этого еще не сделано
      this.modals.splice(curModalIndex, 1)
    },
  },
}
</script>

<style lang="scss">
.modal-wrapper-list {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
}
</style>
