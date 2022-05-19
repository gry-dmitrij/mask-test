<template>
  <div class="error-wrap">
    <Component
      :is="errorComponent"
      :error="error"
      :error-title.sync="errorTitle"
    />
  </div>
</template>

<script>
import Error404 from '~/components/Errors/404.vue'
import ErrorDefault from '~/components/Errors/Default.vue'

export default {
  name: 'PageError',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errorTitle: 'Произошла ошибка',
    }
  },
  head() {
    return {
      title: this.errorTitle,
    }
  },
  computed: {
    errorComponent() {
      if (this.error.statusCode === 404) {
        return Error404
      }

      return ErrorDefault
    },
  },
}
</script>
