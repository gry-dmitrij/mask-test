<template>
  <input
    v-imask="mask"
    :value="data"
    v-bind="$attrs"
    v-on="inputListeners"
  >
</template>

<script>
// import { IMaskDirective } from 'vue-imask';
//
export default {
  name: "BaseInput",
  directives: {
    // imask: IMaskDirective
  },
  props: {
    mask: {
      type: [String, Object],
      default: () => ({
        mask: ''
      })
    },
  },
  data() {
    return {
      data:''
    }
  },
  computed: {
    inputListeners() {
      const vm = this;
      return {
        ...this.$listeners,
        accept(e) {
          const maskRef = e.detail;
          vm.$emit('input', maskRef.value)
        },
        input(e) {

        }
      }
    },
  },

}
</script>

<style lang="scss"
       scoped>

</style>
