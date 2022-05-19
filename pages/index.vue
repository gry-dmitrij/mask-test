<template>
  <div>
    <h1>Atom7 index</h1>
    <div>
      <BButton @click="testOpenModal">Open modal</BButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    async testOpenModal() {
      const result = await this.$modal.show('default', {
        message: 'test',
        cancelButton: true,
        title: 'Заголовок',
      })
      alert(`result: ${result}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
