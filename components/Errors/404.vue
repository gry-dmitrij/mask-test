<template>
  <div></div>
</template>

<script>
export default {
  name: 'PageError404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
    errorTitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    errorName() {
      return 'Ошибка 404: страница не найдена'
    },
    errorHtml() {
      return `<p>Попробуйте начать с <a href="/">главной страницы</a>.</p>`
    },
  },
  mounted() {
    this.$emit('update:error-title', this.errorName)
    this.$modal.show('default', {
      title: this.errorName,
      message: this.errorHtml,
      okButton: false,
    })
  },
}
</script>
