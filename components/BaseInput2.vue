<template>
<input
  v-imask="mask"
  v-bind="$attrs"
  v-on="inputListeners"
>
</template>

<script>
import IMaskDirective from '@/utils/imask'

export default {
  name: "BaseInput2",
  directives: {
    imask: IMaskDirective
  },
  props: {
    mask: {
      type: [String, Object],
      default: () => ({
        mask: ''
      })
    },
  },
  computed: {
    inputListeners() {
      const vm = this;
      return {
        ...this.$listeners,
        accept(e) {
          vm.onAccept(e)
        },
        input() {

        }
      }
    },
  },
  methods: {
    onAccept(e) {
      const maskRef = e.detail;
      this.$emit('input', maskRef.value)
    },
  },
}
</script>

<style lang="scss"
       scoped>

</style>
