<template>
  <input
    v-imask="mask"
    :value="data"
    v-bind="$attrs"
    v-on="inputListeners"
  >
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {
  name: "BaseInput",
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
          vm.onAccept(e)
        },
        input(e) {
          console.log('input: ', e)
        }
      }
    },
  },
  watch: {
    '$attrs.value'(val) {
      if (this.data !== val) {
        this.data = val
      }
    }
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
