<template>
  <div></div>
</template>

<script>
export default {
  name: 'PageErrorDefault',
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
      return 'Неизвестная ошибка'
    },
    errorHtml() {
      return `<p>Попробуйте <a href="javascript:location.reload()">перезагрузить текущую страницу</a> или начать с <a href="/">главной страницы</a>.</p>`
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
